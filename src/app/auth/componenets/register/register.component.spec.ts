import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

import { RegisterComponent } from './register.component';
import { AuthService } from '../../services/auth.service';
import { SocketService } from 'src/app/shared/services/socket.service';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: AuthService;
  let socketService: SocketService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
      ],
      declarations: [ RegisterComponent ],
      providers: [ AuthService, SocketService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authService = TestBed.inject(AuthService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid when empty', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('email field should be required', () => {
    let email = component.form.controls['email'];
    expect(email.valid).toBeFalsy();

    email.setValue('');
    expect(email.hasError('required')).toBeTruthy();
  });

  it('name field should be required', () => {
    let name = component.form.controls['name'];
    expect(name.valid).toBeFalsy();

    name.setValue('');
    expect(name.hasError('required')).toBeTruthy();
  });

  it('username field should be required', () => {
    let username = component.form.controls['username'];
    expect(username.valid).toBeFalsy();

    username.setValue('');
    expect(username.hasError('required')).toBeTruthy();
  });

  it('password field should be required', () => {
    let password = component.form.controls['password'];
    expect(password.valid).toBeFalsy();

    password.setValue('');
    expect(password.hasError('required')).toBeTruthy();
  });

  it('form should be valid when all fields are filled', () => {
    component.form.controls['email'].setValue('test@email.com');
    component.form.controls['name'].setValue('testName');
    component.form.controls['username'].setValue('testUsername');
    component.form.controls['password'].setValue('testPassword');
    expect(component.form.valid).toBeTruthy();
  });

  const errorMessage = 'Failed to register';

  // it('should show error message on failed registration', () => {
  //   component.errorMessage = 'Failed to register';
  //   fixture.detectChanges();
  //   const errorMessageEl = fixture.debugElement.query(By.css('.error-message')).nativeElement;
  //   expect(errorMessageEl.textContent).toEqual('Failed to register');
  //   });
    
    // it('should call setToken method of authService on successful registration', () => {
    // const spy = spyOn(authService, 'setToken');
    // const spy1 = spyOn(authService, 'register').and.returnValue(throwError({ error: errorMessage }));
    // component.onSubmit();
    // expect(spy).toHaveBeenCalled();
    // });
    
    // it('should call setCurrentUser method of authService on successful registration', () => {
    // const spy = spyOn(authService, 'setCurrentUser');
    // const spy1 = spyOn(authService, 'register').and.returnValue(throwError({ error: errorMessage }));
    // component.onSubmit();
    // expect(spy).toHaveBeenCalled();
    // });
    
    // it('should call setupSocketConnection method of socketService on successful registration', () => {
    // const spy = spyOn(socketService, 'setupSocketConnection');
    // const spy1 = spyOn(authService, 'register').and.returnValue(throwError({ error: errorMessage }));
    // component.onSubmit();
    // expect(spy).toHaveBeenCalled();
    // });

});  