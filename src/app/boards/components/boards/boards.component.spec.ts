import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BoardsComponent } from './boards.component';
import { BoardsService } from 'src/app/shared/services/boards.service';
import { BoardInterface } from 'src/app/shared/types/board.interface';
import { of } from 'rxjs';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { SocketService } from 'src/app/shared/services/socket.service';

describe('BoardsComponent', () => {
    let component: BoardsComponent;
    let boardsService: BoardsService;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        declarations: [BoardsComponent],
        providers: [BoardsService,BoardsComponent,HttpClient,HttpHandler,SocketService],
      }).compileComponents();
    }));
  
    beforeEach(() => {
      component = TestBed.inject(BoardsComponent);
      boardsService = TestBed.inject(BoardsService);
    });
  
    it('should get boards on ngOnInit', () => {
      const spy = spyOn(boardsService, 'getBoards').and.returnValue(of([{ id: 1, title: 'Test Board' } as unknown as BoardInterface]));
      component.ngOnInit();
      expect(component.boards).toEqual([{ id: 1, title: 'Test Board' } as unknown as BoardInterface]);
    });
  
    it('should create a board', () => {
      const spy = spyOn(boardsService, 'createBoard').and.returnValue(of({ id: 2, title: 'Test Board 2' } as unknown as BoardInterface));
      component.createBoard('Test Board 2');
      expect(component.boards).toEqual([{ id: 2, title: 'Test Board 2' } as unknown as BoardInterface]);
    });

    it('should get boards on ngOnInit', () => {
      const spy = spyOn(boardsService, 'getBoards').and.returnValue(of([{ id: 1, title: 'Test Board' } as unknown as BoardInterface]));
      component.ngOnInit();
      expect(component.boards).toEqual([{ id: 1, title: 'Test Board' } as unknown as BoardInterface]);
      });
      
    it('should create a new board', () => {
      const spy = spyOn(boardsService, 'createBoard').and.returnValue(of({ id: 2, title: 'New Board' } as unknown as BoardInterface));
      component.createBoard('New Board');
      expect(component.boards).toContain({ id: 2, title: 'New Board' } as unknown as BoardInterface);
    });
      
    it('should call createBoard when creating a new board', () => {
      const spy = spyOn(boardsService, 'createBoard').and.returnValue(of({ id: 1, title: 'Test Board' } as unknown as BoardInterface));
      component.createBoard('Test Board');
      expect(boardsService.createBoard).toHaveBeenCalledWith('Test Board');
      expect(component.boards).toEqual([{ id: 1, title: 'Test Board' } as unknown as BoardInterface]);
      });
  });
