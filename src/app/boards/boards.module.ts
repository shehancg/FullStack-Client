import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BoardsComponent } from "./components/boards/boards.component";
import { AuthGuardService } from "../auth/services/authGuard.service";
import { BoardsService } from "../shared/services/boards.service";
import { InlineFormModule } from "../shared/modules/inlineForm/inlineForm.module";

const routes:Routes = [
    {
        path: 'boards',
        component: BoardsComponent,
        canActivate: [AuthGuardService],
    },    
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), InlineFormModule],
    declarations: [BoardsComponent],
    providers: [BoardsService],
})
export class BoardsModuel{}
