import { Component, HostBinding, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, combineLatest, filter, map, takeUntil } from 'rxjs';
import { BoardService } from '../../services/board.service';
import { TaskInterface } from 'src/app/shared/types/task.interface';
import { FormBuilder, Validators } from '@angular/forms';
import { ColumnInterface } from 'src/app/shared/types/column.interface';
import { TasksService } from 'src/app/shared/services/task.service';
import { SocketService } from 'src/app/shared/services/socket.service';
import { SocketEventEnum } from 'src/app/shared/types/socketEvents.enum';

@Component({
  selector: 'task-modal',
  templateUrl: './taskModal.component.html',
})
export class TaskModalComponent implements OnDestroy{
  @HostBinding('class') classes = 'task-modal';

  boardId: string;
  taskId: string;
  task$: Observable<TaskInterface>;
  data$: Observable<{ task: TaskInterface; columns: ColumnInterface[] }>;
  columnForm = this.fb.group({
    columnId: [' '],
  });
  unsubscribe$ = new Subject<void>();

  constructor(private route: ActivatedRoute,private socketService: SocketService, private router: Router, private boardService: BoardService, private taskService: TasksService, private fb: FormBuilder) {
    const taskId = this.route.snapshot.paramMap.get('taskId');
    const boardId = this.route.parent?.snapshot.paramMap.get('boardId');

    if (!boardId) {
      throw new Error("Can't get boardID from URL");
    }

    if (!taskId) {
      throw new Error("Can't get taskID from URL");
    }

    this.taskId = taskId;
    this.boardId = boardId;
    this.task$ = this.boardService.tasks$.pipe(
      map((tasks) => {
        return tasks.find((task) => task.id === this.taskId);
      }),
      filter(Boolean)
    );
    this.data$ = combineLatest([this.task$, this.boardService.columns$]).pipe(
      map(([task, columns]) => ({
        task,
        columns,
      }))
    );

    this.task$.pipe(takeUntil(this.unsubscribe$)).subscribe((task) => {
      this.columnForm.patchValue({ columnId: task.columnId });
    });
    // this.task$.subscribe((task)=>{
    //   this.columnForm.patchValue({columnId:task.columnId});
    // }); 

    combineLatest([this.task$, this.columnForm.get('columnId')!.valueChanges,])
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(([task, columnId]) => {
        if (task.columnId !== columnId) {
          this.taskService.updateTask(this.boardId, task.id, { columnId: columnId! });
        }
      });

    this.socketService
      .listen<string>(SocketEventEnum.tasksDeleteSuccess)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.goToBoard();
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  goToBoard(): void {
    this.router.navigate(['boards', this.boardId]);
  }

  updateTaskName(taskName: string): void {
    this.taskService.updateTask(this.boardId, this.taskId, {
      title: taskName,
    });
  }

  updateTaskDescription(taskDesctiption: string): void {
    this.taskService.updateTask(this.boardId, this.taskId, {
      description: taskDesctiption,
    });
  }

  deleteTask() {
    this.taskService.deleteTask(this.boardId, this.taskId);
  }
}
