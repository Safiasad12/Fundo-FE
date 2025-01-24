import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { UserService } from 'src/app/services/user-service/user.service';
import { LoginComponent } from './login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockUserService: any;
  let mockRouter: any;

  beforeEach(async () => {
    mockUserService = jasmine.createSpyObj('UserService', ['loginApiCall']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule, 
      ],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the form with email and password fields', () => {
    const compiled = fixture.nativeElement;
    const emailInput = compiled.querySelector('input[formControlName="email"]');
    const passwordInput = compiled.querySelector('input[formControlName="password"]');
    const loginButton = compiled.querySelector('button[type="submit"]');

    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(loginButton).toBeTruthy();
  });


  it('should display validation errors when form is invalid and submitted', () => {
   
    component.submitted = true;

    component.loginForm.controls['email'].setValue(''); // Empty email
    component.loginForm.controls['email'].markAsTouched();
    component.loginForm.controls['email'].setErrors({ required: true });

    component.loginForm.controls['password'].setValue(''); // Empty password
    component.loginForm.controls['password'].markAsTouched();
    component.loginForm.controls['password'].setErrors({ required: true });

    fixture.detectChanges();
  
    const compiled = fixture.nativeElement;

    const error = compiled.querySelectorAll('mat-error');

    console.log(error);

    expect(error[0]?.textContent).toContain('Email is required');
    expect(error[1]?.textContent).toContain('Password is required');

  });
  
  
  

  it('should call the login API and navigate on successful login', () => {
    const mockResponse = { token: 'dummy-token' };
    mockUserService.loginApiCall.and.returnValue(of(mockResponse));

    component.loginForm.setValue({ email: 'test@example.com', password: 'password123' });
    component.handleLogin();

    expect(mockUserService.loginApiCall).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password123' });
    expect(localStorage.getItem('authToken')).toEqual('dummy-token');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard/notes']);
  });


  it('should log an error when login API fails', () => {
    spyOn(console, 'log');
    const mockError = 'Invalid credentials';
    mockUserService.loginApiCall.and.returnValue(throwError(mockError));

    component.loginForm.setValue({ email: 'test@example.com', password: 'wrongpassword' });
    component.handleLogin();


    expect(mockUserService.loginApiCall).toHaveBeenCalledWith({ email: 'test@example.com', password: 'wrongpassword' });
    expect(console.log).toHaveBeenCalledWith(mockError);
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });
});
