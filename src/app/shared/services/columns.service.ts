import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ColumnInterface } from '../types/column.interface';
import { ColumnInputInterface } from '../types/columnInput.interface';
import { SocketEventEnum } from '../types/socketEvents.enum';
import { SocketService } from './socket.service';

@Injectable()
export class ColumnsService {
  constructor(private http: HttpClient, private socketService: SocketService) {}

  getColumns(boardId: string): Observable<ColumnInterface[]> {
    const url = `${environment.apiUrl}/boards/${boardId}/columns`;
    return this.http.get<ColumnInterface[]>(url);
  }

  createColumn(columnInput: ColumnInputInterface): void {
    this.socketService.emit(SocketEventEnum.columnsCreate, columnInput);
  }

  deleteColumn(boardId: string, columnId: string): void {
    this.socketService.emit(SocketEventEnum.columnsDelete, {
      boardId,
      columnId,
    });
  }

  updateColumn(
    boardId: string,
    columnId: string,
    fields: { title: string }
  ): void {
    this.socketService.emit(SocketEventEnum.columnsUpdate, {
      boardId,
      columnId,
      fields,
    });
  }
}
