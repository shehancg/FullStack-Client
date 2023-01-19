import { NgModule } from "@angular/core";
import { AuthService } from "./services/auth.service";
import { RegisterComponent } from "./componenets/register/register.component";
import { Routes, RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./componenets/login/login.component";
import { AuthGuardService } from "./services/authGuard.service";

const routes:Routes = [
    {
        path: 'register',
        component: RegisterComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
        //canActivate: [AuthGuardService]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes),ReactiveFormsModule, CommonModule],
    providers: [AuthService, AuthGuardService],
    declarations: [RegisterComponent, LoginComponent],
})
export class AuthModule{}