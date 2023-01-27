import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { SocketService } from "src/app/shared/services/socket.service";
import { BoardInterface } from "src/app/shared/types/board.interface";
import { ColumnInterface } from "src/app/shared/types/column.interface";
import { SocketEventEnum } from 'src/app/shared/types/socketEvents.enum';
import { TaskInterface } from "src/app/shared/types/task.interface";

@Injectable()
export class BoardService {
    board$ = new BehaviorSubject<BoardInterface | null>(null);
    columns$ = new BehaviorSubject<ColumnInterface[]>([]);
    tasks$ = new BehaviorSubject<TaskInterface[]>([]);

  constructor(private socketService: SocketService) {}

    setBoard(board: BoardInterface): void {
        this.board$.next(board);
    }

    setColumns(columns: ColumnInterface[]): void {
      this.columns$.next(columns);
    }

    setTasks(tasks: TaskInterface[]): void {
      this.tasks$.next(tasks);
    }

    leaveBoard(boardId: string): void {
      this.board$.next(null);
      this.socketService.emit(SocketEventEnum.boardsLeave, { boardId });
    }

    addColumn(column: ColumnInterface): void {
      const updatedColumns = [...this.columns$.getValue(), column];
      this.columns$.next(updatedColumns);
    }

    addTask(task: TaskInterface): void {
      const updatedTasks = [...this.tasks$.getValue(), task];
      this.tasks$.next(updatedTasks);
    }

    updateBoard(updatedBoard: BoardInterface): void {
      const board = this.board$.getValue();
      if (!board) {
        throw new Error('Board is not initialized');
      }
      this.board$.next({ ...board, title: updatedBoard.title });
    }
    
    deleteColumn(columnId: string): void {
      const updatedColumns = this.columns$
        .getValue()
        .filter((column) => column.id !== columnId);
      this.columns$.next(updatedColumns);
    }

    updateColumn(updatedColumn: ColumnInterface): void {
      const updatedColumns = this.columns$.getValue().map((column) => {
        if (column.id === updatedColumn.id) {
          return { ...column, title: updatedColumn.title };
        }
        return column;
      });
      this.columns$.next(updatedColumns);
    }
}