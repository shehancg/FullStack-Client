import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BoardsService } from "src/app/shared/services/boards.service";

@Component({
    selector: 'board',
    templateUrl: './board.component.html'
})
export class BoardComponent implements OnInit{
    boardId: string;

    constructor(private boardsService: BoardsService,
        private route: ActivatedRoute){
            const boardId = this.route.snapshot.paramMap.get('boardId');

            if(!boardId){
                throw new Error('Cant get board Id from Url')
            }
            this.boardId = boardId
        }

    ngOnInit(): void {
        
        this.fetchData();
    }

    fetchData(): void {
        this.boardsService.getBoard(this.boardId).subscribe((board) => {
            console.log('board',board);
        });
    }
}

