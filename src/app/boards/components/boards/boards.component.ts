import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/auth/services/auth.service";
import { BoardsService } from "src/app/shared/services/boards.service";

@Component({
    selector: 'boards',
    templateUrl: './boards.component.html'
})
export class BoardsComponent {
    constructor(private boardsService: BoardsService){}

    ngOnInit(): void{
        this.boardsService.getBoards().subscribe((boards) =>{
            console.log('boards',boards);
        })
    }
}