import { NgModule } from "@angular/core";
import { AuthService } from "./services/auth.service";
import { RegisterComponent } from "./componenets/register/register.component";
import { Routes, RouterModule } from "@angular/router";

const routes:Routes = [
    {
        path: 'register',
        component: RegisterComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    providers: [AuthService],
    declarations: [RegisterComponent],
})
export class AuthModule{}