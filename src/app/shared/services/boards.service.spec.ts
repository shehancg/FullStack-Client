// import { TestBed } from '@angular/core/testing';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { BoardsService } from './boards.service';
// import { SocketService } from './socket.service';
// import { BoardInterface } from '../types/board.interface';

// describe('BoardsService', () => {
// let service: BoardsService;
// let httpTestingController: HttpTestingController;

// beforeEach(() => {
// TestBed.configureTestingModule({
// imports: [HttpClientTestingModule],
// providers: [BoardsService, SocketService],
// });
// service = TestBed.inject(BoardsService);
// httpTestingController = TestBed.inject(HttpTestingController);
// });

// afterEach(() => {
// httpTestingController.verify();
// });

// it('should return an array of boards', () => {
//   const boards = [{ id: 1, title: 'Test Board' } as BoardInterface];
//   const spy = spyOn(http, 'get').and.returnValue(of(boards));
//   boardsService.getBoards().subscribe(res => {
//     expect(res).toEqual(boards);
//   });
// });


// });