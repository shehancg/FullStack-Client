import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { of } from "rxjs";
import { AuthService } from "src/app/auth/services/auth.service";
import { HomeComponent } from "./home.component";

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;
    let authService: AuthService;
    let router: Router;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HomeComponent],
            providers: [
                {
                    provide: AuthService, useValue: {
                        isLogged$: of(false)
                    }
                },
                {
                    provide: Router, useValue: {
                        navigateByUrl: jasmine.createSpy('navigateByUrl')
                    }
                }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        authService = TestBed.get(AuthService);
        router = TestBed.get(Router);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should navigate to /boards if user is logged in', () => {
        authService.isLogged$ = of(true);
        fixture.detectChanges();
        expect(router.navigateByUrl).toHaveBeenCalledWith('/boards');
    });

    it('should not navigate if user is not logged in', () => {
        fixture.detectChanges();
        expect(router.navigateByUrl).not.toHaveBeenCalled();
    });
  
});
