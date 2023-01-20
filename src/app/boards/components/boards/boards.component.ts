import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/auth/services/auth.service";
import { BoardsService } from "src/app/shared/services/boards.service";
import { BoardInterface } from "src/app/shared/types/board.interface";

@Component({
    selector: 'boards',
    templateUrl: './boards.component.html'
})
export class BoardsComponent implements OnInit{
    boards: BoardInterface[] = [];
    constructor(private boardsService: BoardsService){}

    ngOnInit(): void{
        this.boardsService.getBoards().subscribe((boards) =>{
            this.boards = boards;
        });
    }

    createBoard(title: string): void{
        this.boardsService.createBoard(title).subscribe((createBoard) => {
            this.boards = [...this.boards, createBoard];
        });
    }
}