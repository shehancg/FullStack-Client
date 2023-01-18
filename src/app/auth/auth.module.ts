import { NgModule } from "@angular/core";
import { AuthService } from "./services/auth.service";
import { RegisterComponent } from "./componenets/register/register.component";
import { Routes, RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";

const routes:Routes = [
    {
        path: 'register',
        component: RegisterComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes),ReactiveFormsModule, CommonModule],
    providers: [AuthService],
    declarations: [RegisterComponent],
})
export class AuthModule{}