import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { RegisterRequestInterface } from '../../types/registerRequest.interface';

@Component({
  selector: 'auth-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  errorMessage: string | null = null;
  form = this.fb.group({
    email: ['', Validators.required],
    name: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  // onSubmit(): void {
  //   this.authService.register(this.form.value).subscribe({
  //     next: (currentUser) => {
  //       console.log('currentUser',currentUser)
  //     },
  //     error: (err) => {
  //       console.log('err',err)
  //     }
  //   })
  // }

  onSubmit(): void {
    const request: RegisterRequestInterface = {
      email: this.form.value.email||'',
      name: this.form.value.name||'',
      username: this.form.value.username||'',
      password: this.form.value.password||''
    };
    this.authService.register(request).subscribe({
      next: (currentUser) => {
        console.log('currentUser',currentUser);
        this.authService.setToken(currentUser);
        this.authService.setCurrentUser(currentUser);
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
