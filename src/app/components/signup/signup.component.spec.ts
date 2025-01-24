import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { UserService } from 'src/app/services/user-service/user.service';
import { SignupComponent } from './signup.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let mockUserService: any;
  let mockRouter: any;

  beforeEach(async () => {
    mockUserService = jasmine.createSpyObj('UserService', ['signupApiCall']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [SignupComponent],
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
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the form with all required fields', () => {
    const compiled = fixture.nativeElement;

    const firstnameInput = compiled.querySelector('input[formControlName="firstname"]');
    const lastnameInput = compiled.querySelector('input[formControlName="lastname"]');
    const usernameInput = compiled.querySelector('input[formControlName="username"]');
    const emailInput = compiled.querySelector('input[formControlName="email"]');
    const passwordInput = compiled.querySelector('input[formControlName="password"]');
    const signupButton = compiled.querySelector('button[type="submit"]');

    expect(firstnameInput).toBeTruthy();
    expect(lastnameInput).toBeTruthy();
    expect(usernameInput).toBeTruthy();
    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(signupButton).toBeTruthy();
  });

  it('should display validation errors when form is invalid and submitted', () => {
    component.submitted = true;

    component.signupForm.controls['firstname'].setValue('');
    component.signupForm.controls['firstname'].markAsTouched();
    component.signupForm.controls['firstname'].setErrors({ required: true });

    component.signupForm.controls['lastname'].setValue('');
    component.signupForm.controls['lastname'].markAsTouched();
    component.signupForm.controls['lastname'].setErrors({ required: true });

    component.signupForm.controls['username'].setValue('');
    component.signupForm.controls['username'].markAsTouched();
    component.signupForm.controls['username'].setErrors({ required: true });

    component.signupForm.controls['email'].setValue('');
    component.signupForm.controls['email'].markAsTouched();
    component.signupForm.controls['email'].setErrors({ required: true });

    component.signupForm.controls['password'].setValue('');
    component.signupForm.controls['password'].markAsTouched();
    component.signupForm.controls['password'].setErrors({ required: true });

    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const errors = compiled.querySelectorAll('mat-error');

    console.log(errors);

    expect(errors[0]?.textContent).toContain('first name is required');
    expect(errors[1]?.textContent).toContain('last name is required');
    expect(errors[2]?.textContent).toContain('user name is required');
    expect(errors[3]?.textContent).toContain('Email is required');
    expect(errors[4]?.textContent).toContain('Password is required');
  });

  it('should call the signup API and navigate on successful signup', () => {
    const mockResponse = { message: 'Signup successful' };
    mockUserService.signupApiCall.and.returnValue(of(mockResponse));

    component.signupForm.setValue({
      firstname: 'John',
      lastname: 'Doe',
      username: 'johndoe',
      email: 'john.doe@example.com',
      password: 'password123',
    });

    component.handleSignUp();

    expect(mockUserService.signupApiCall).toHaveBeenCalledWith({
      firstname: 'John',
      lastname: 'Doe',
      username: 'johndoe',
      email: 'john.doe@example.com',
      password: 'password123',
    });
    expect(mockRouter.navigate).toHaveBeenCalledWith(['']);
  });

  it('should log an error when signup API fails', () => {
    spyOn(console, 'log');
    const mockError = 'Signup failed';
    mockUserService.signupApiCall.and.returnValue(throwError(mockError));

    component.signupForm.setValue({
      firstname: 'John',
      lastname: 'Doe',
      username: 'johndoe',
      email: 'john.doe@example.com',
      password: 'password123',
    });

    component.handleSignUp();

    expect(mockUserService.signupApiCall).toHaveBeenCalledWith({
      firstname: 'John',
      lastname: 'Doe',
      username: 'johndoe',
      email: 'john.doe@example.com',
      password: 'password123',
    });
    expect(console.log).toHaveBeenCalledWith(mockError);
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });
});
