// import { HttpClient } from "@angular/common/http";
// import { of } from "rxjs";
// import { environment } from "src/environments/environment";
// import { BoardsService } from "./boards.service";
// import { SocketService } from "./socket.service";

// describe("BoardsService", () => {
//     let httpClientSpy: jasmine.SpyObj<HttpClient>;
//     let socketServiceSpy: jasmine.SpyObj<SocketService>;
//     let boardsService: BoardsService;
//     const spy = jasmine.createSpyObj('spyName', ['method1', 'method2']);
  
//     beforeEach(() => {
//       httpClientSpy = jasmine.createSpyObj("spyName", ["get", "post"]);
//       socketServiceSpy = jasmine.createSpyObj("SocketService", []);
//       boardsService = new BoardsService(httpClientSpy, socketServiceSpy);
//     });
  
//     it("should retrieve a list of boards", () => {
//       const expectedBoards = [{ id: "board-1", title: "Board 1" }, { id: "board-2", title: "Board 2" }];
//       httpClientSpy.get.and.returnValue(of(expectedBoards));
  
//       boardsService.getBoards().subscribe((boards) => {
//         expect(boards);
//       });
  
//       const url = environment.apiUrl + "/boards";
//       expect(httpClientSpy.get).toHaveBeenCalledWith(url);
//     });
  
//     it("should create a new board", () => {
//       const boardTitle = "New Board";
//       const expectedBoard = { id: "board-3", title: boardTitle };
//       httpClientSpy.post.and.returnValue(of(expectedBoard));
  
//       boardsService.createBoard(boardTitle).subscribe((board) => {
//         expect(board);
//       });
  
//       const url = environment.apiUrl + "/boards";
//       expect(httpClientSpy.post).toHaveBeenCalledWith(url, { title: boardTitle });
//     });
  
//     it("should retrieve a single board", () => {
//       const boardId = "board-1";
//       const expectedBoard = { id: boardId, title: "Board 1" };
//       httpClientSpy.get.and.returnValue(of(expectedBoard));
  
//       boardsService.getBoard(boardId).subscribe((board) => {
//         expect(board);
//       });
  
//       const url = `${environment.apiUrl}/boards/${boardId}`;
//       expect(httpClientSpy.get).toHaveBeenCalledWith(url);
//     });
//   });
  