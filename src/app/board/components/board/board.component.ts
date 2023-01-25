import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationStart, Router } from "@angular/router";
import { BoardsService } from "src/app/shared/services/boards.service";
import { BoardService } from "../../services/board.service";
import { Observable, filter, combineLatest, map } from "rxjs";
import { BoardInterface } from "src/app/shared/types/board.interface";
import { SocketService } from "src/app/shared/services/socket.service";
import { SocketEventEnum } from "src/app/shared/types/socketEvents.enum";
import { ColumnsService } from "src/app/shared/services/columns.service";
import { ColumnInterface } from "src/app/shared/types/column.interface";
import { ColumnInputInterface } from 'src/app/shared/types/columnInput.interface';



@Component({
    selector: 'board',
    templateUrl: './board.component.html'
})
export class BoardComponent implements OnInit{
    boardId: string;
    data$: Observable<{
        board: BoardInterface;
        columns: ColumnInterface[];
      }>;

    constructor(private boardsService: BoardsService,
        private route: ActivatedRoute,
        private boardService: BoardService,
        private socketService: SocketService,
        private router: Router,
        private columnsService: ColumnsService){
            const boardId = this.route.snapshot.paramMap.get('boardId');

            if(!boardId){
                throw new Error('Cant get board Id from Url')
            }
            this.boardId = boardId;
            this.data$ = combineLatest([
                this.boardService.board$.pipe(filter(Boolean)),
                this.boardService.columns$
              ]).pipe(
                map(([board, columns]) => ({
                  board,
                  columns
                }))
              );
        }

    ngOnInit(): void {   
        this.socketService.emit(SocketEventEnum.boardsJoin, {boardId: this.boardId});    
        this.fetchData();
        this.initializeListeners();
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
        .subscribe((column) => {
        this.boardService.addColumn(column);
      });
    }

    fetchData(): void {
        this.boardsService.getBoard(this.boardId).subscribe((board) => {
            this.boardService.setBoard(board)
        });
        this.columnsService.getColumns(this.boardId).subscribe((columns) => {
            this.boardService.setColumns(columns);
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
}

