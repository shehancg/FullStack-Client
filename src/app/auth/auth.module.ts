import { NgModule } from "@angular/core";
import { AuthService } from "./services/auth.service";
import { RegisterComponent } from "./componenets/register/register.component";
import { Routes, RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes:Routes = [
    {
        path: 'register',
        component: RegisterComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes),ReactiveFormsModule],
    providers: [AuthService],
    declarations: [RegisterComponent],
})
export class AuthModule{}