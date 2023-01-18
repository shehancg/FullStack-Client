import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { RegisterRequestInterface } from '../../types/registerRequest.interface';
import { LoginRequestInterface } from '../../types/loginRequest.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  errorMessage: string | null = null;
  form = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    const request: LoginRequestInterface = {
      email: this.form.value.email||'',
      password: this.form.value.password||'',
    };
    this.authService.login(request).subscribe({
      next: (currentUser) => {
        console.log('currentUser',currentUser);
        this.authService.setToken(currentUser);
        this.authService.setCurrentUser(currentUser);
        this.errorMessage = null;
        this.router.navigateByUrl('/');
      },
      error: (err: HttpErrorResponse) => {
        console.log('err',err.error);
        if (err.error) {
          this.errorMessage = Object.values(err.error).join(', ');
        } else {
            this.errorMessage = "Something went wrong";
        }
      }
    });
  }
}
