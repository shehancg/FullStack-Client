import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationStart, Router } from "@angular/router";
import { BoardsService } from "src/app/shared/services/boards.service";
import { BoardService } from "../../services/board.service";
import { Observable, filter, combineLatest, map, Subject, takeUntil } from "rxjs";
import { BoardInterface } from "src/app/shared/types/board.interface";
import { SocketService } from "src/app/shared/services/socket.service";
import { SocketEventEnum } from "src/app/shared/types/socketEvents.enum";
import { ColumnsService } from "src/app/shared/services/columns.service";
import { ColumnInterface } from "src/app/shared/types/column.interface";
import { ColumnInputInterface } from 'src/app/shared/types/columnInput.interface';
import { TaskInterface } from "src/app/shared/types/task.interface";
import { TasksService } from "src/app/shared/services/task.service";
import { TaskInputInterface } from 'src/app/shared/types/taskinput.interface';


@Component({
    selector: 'board',
    templateUrl: './board.component.html'
})
export class BoardComponent implements OnInit, OnDestroy{
    boardId: string;
    data$: Observable<{
        board: BoardInterface;
        columns: ColumnInterface[];
        tasks: TaskInterface[];
      }>;

    unsubscribe$ = new Subject<void>();  

    constructor(private boardsService: BoardsService,
        private route: ActivatedRoute,
        private boardService: BoardService,
        private socketService: SocketService,
        private router: Router,
        private columnsService: ColumnsService,
        private tasksService: TasksService){
            const boardId = this.route.snapshot.paramMap.get('boardId');

            if(!boardId){
                throw new Error('Cant get board Id from Url')
            }
            this.boardId = boardId;
            this.data$ = combineLatest([
                this.boardService.board$.pipe(filter(Boolean)),
                this.boardService.columns$,
                this.boardService.tasks$,
              ]).pipe(
                map(([board, columns, tasks]) => ({
                  board,
                  columns,
                  tasks
                }))
              );
        }

    ngOnInit(): void {   
        this.socketService.emit(SocketEventEnum.boardsJoin, {boardId: this.boardId});    
        this.fetchData();
        this.initializeListeners();
    }

    ngOnDestroy(): void {
      this.unsubscribe$.next();
      this.unsubscribe$.complete();
    }

    initializeListeners(): void {
        this.router.events.subscribe((event) => {
          if (event instanceof NavigationStart) {
            //console.log('Leaving the Page');
            this.boardService.leaveBoard(this.boardId)
            //this.boardService.leaveBoard(this.boardId);
          }
        });

      this.socketService
      .listen<ColumnInterface>(SocketEventEnum.columnsCreateSuccess)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((column) => {
      this.boardService.addColumn(column);
      });

      this.socketService
      .listen<string>(SocketEventEnum.columnsDeleteSuccess)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((columnId) => {
        this.boardService.deleteColumn(columnId);
      });

      this.socketService
      .listen<ColumnInterface>(SocketEventEnum.columnsUpdateSuccess)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((updatedColumn) => {
        this.boardService.updateColumn(updatedColumn);
      });

      this.socketService
      .listen<TaskInterface>(SocketEventEnum.tasksCreateSuccess)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((task) => {
        this.boardService.addTask(task);
      });

      this.socketService
      .listen<BoardInterface>(SocketEventEnum.boardsUpdateSuccess)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((updatedBoard) => {
        this.boardService.updateBoard(updatedBoard);
      });

      this.socketService
      .listen<void>(SocketEventEnum.boardsDeleteSuccess)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.router.navigateByUrl('/boards');
      });
    }

    fetchData(): void {
        this.boardsService.getBoard(this.boardId).subscribe((board) => {
            this.boardService.setBoard(board)
        });
        this.columnsService.getColumns(this.boardId).subscribe((columns) => {
            this.boardService.setColumns(columns);
        }); 
        this.tasksService.getTasks(this.boardId).subscribe((tasks) => {
          this.boardService.setTasks(tasks);
        });   
    }

    // test(): void{
    //     this.socketService.emit('columns:create',{
    //         boardId:this.boardId,
    //         title: 'Demo',
    //     });
    // }

    createColumn(title: string): void {
      const columnInput: ColumnInputInterface = {
        title,
        boardId: this.boardId,
      };
      this.columnsService.createColumn(columnInput);
    }

    createTask(title: string, columnId: string): void {
      const taskInput: TaskInputInterface = {
        title,
        boardId: this.boardId,
        columnId,
      };
      this.tasksService.createTask(taskInput);
    }

    getTasksByColumn(columnId: string, tasks: TaskInterface[]): TaskInterface[] {
      return tasks.filter((task) => task.columnId === columnId);
    }

    updateBoardName(boardName: string): void {
      this.boardsService.updateBoard(this.boardId, { title: boardName });
    }

    deleteBoard(): void {
      if (confirm('Are you sure you want to delete the board?')) {
        this.boardsService.deleteBoard(this.boardId);
      }
    }

    deleteColumn(columnId: string): void {
      this.columnsService.deleteColumn(this.boardId, columnId);
    }

    updateColumnName(columnName: string, columnId: string): void {
      this.columnsService.updateColumn(this.boardId, columnId, {
        title: columnName,
      });
    }
}

