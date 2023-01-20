import { Injectable }from '@angular/core';
import { BehaviorSubject,Observable, filter, map } from 'rxjs';
import { CurrentUserInterface } from '../types/currentUser.interface';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { RegisterRequestInterface } from '../types/registerRequest.interface'
import { LoginRequestInterface } from '../types/loginRequest.interface';

@Injectable()
export class AuthService {
  currentUser$ = new BehaviorSubject<CurrentUserInterface | null | undefined>(
    undefined
  );
  isLogged$ = this.currentUser$.pipe(
    filter((currentUser) => currentUser !== undefined),
    map(Boolean)
  );

    constructor(private http:HttpClient){}

    getCurrentUser():Observable<CurrentUserInterface>{
        const url = environment.apiUrl + '/user';
        return this.http.get<CurrentUserInterface>(url);
    }

    register(
        registerRequest: RegisterRequestInterface
      ): Observable<CurrentUserInterface> {
        const url = environment.apiUrl + '/users';
        return this.http.post<CurrentUserInterface>(url, registerRequest);
      }

    login(
        LoginRequest: LoginRequestInterface
      ): Observable<CurrentUserInterface> {
        const url = environment.apiUrl + '/users/login';
        return this.http.post<CurrentUserInterface>(url, LoginRequest);
      }  

    setToken(currentUser: CurrentUserInterface):void{
        localStorage.setItem('token',currentUser.token);
    }

    setCurrentUser(currentUser: CurrentUserInterface | null):void{
        this.currentUser$.next(currentUser);
    }

    logout():void{
      localStorage.removeItem('token');
      this.currentUser$.next(null);
    }
}