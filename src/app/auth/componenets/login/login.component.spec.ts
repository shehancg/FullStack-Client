import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { SocketService } from 'src/app/shared/services/socket.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let socketService: SocketService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule, HttpClientModule, RouterTestingModule ],
      declarations: [ LoginComponent ],
      providers: [
        FormBuilder,
        AuthService,
        SocketService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    socketService = TestBed.inject(SocketService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('email field validity', () => {
    let errors: { [key: string]: boolean } = {};
    let email = component.form.controls['email'];
    expect(email.valid).toBeFalsy();

    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();

    email.setValue('test');
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('password field validity', () => {
    let errors: { [key: string]: boolean } = {};
    let password = component.form.controls['password'];
    expect(password.valid).toBeFalsy();

    errors = password.errors || {};
    expect(errors['required']).toBeTruthy();

    password.setValue('test');
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  // it('submitting a form calls the authService login method', () => {
  //   spyOn(authService, 'login').and.returnValue({ subscribe: () => {} });
  //   component.onSubmit();
  //   expect(authService.login).toHaveBeenCalled();
  // });

});