// src/app/components/login/login.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AuthResponse } from '../../models/auth.response.model';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);

    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        ReactiveFormsModule
      ],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: authServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('should create the login component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should have form invalid when no data is provided', () => {
    fixture.detectChanges();
    component.form.controls['email'].setValue('');
    component.form.controls['password'].setValue('');
    expect(component.form.valid).toBeFalse();

    const submitBtn: HTMLButtonElement = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(submitBtn.disabled).toBeTrue();
  });

  it('should enable the button when valid data is provided', () => {
    fixture.detectChanges();
    component.form.controls['email'].setValue('test@example.com');
    component.form.controls['password'].setValue('password123');
    fixture.detectChanges();

    expect(component.form.valid).toBeTrue();

    const submitBtn: HTMLButtonElement = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(submitBtn.disabled).toBeFalse();
  });

  it('should display validation error when email is invalid and touched', () => {
    fixture.detectChanges();
    const emailInput: HTMLInputElement = fixture.nativeElement.querySelector('#email');
    emailInput.value = 'invalid-email';
    emailInput.dispatchEvent(new Event('input'));
    emailInput.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    const errorMsg: HTMLElement = fixture.nativeElement.querySelector('.error');
    expect(errorMsg.textContent).toContain('Correu no vàlid');
  });

  it('should call login when form is submitted with valid data', () => {
    const dummyResponse: AuthResponse = { message: 'Login correcte', token: 'abc123' };

    authServiceSpy.login.and.returnValue(of(dummyResponse));
    fixture.detectChanges();

    component.form.controls['email'].setValue('test@example.com');
    component.form.controls['password'].setValue('password123');
    fixture.detectChanges();

    const submitBtn: HTMLElement = fixture.nativeElement.querySelector('button[type="submit"]');
    submitBtn.click();
    expect(authServiceSpy.login).toHaveBeenCalledWith( 'test@example.com',  'password123' );
  });

  it('should display error message on login failure', () => {
    authServiceSpy.login.and.returnValue(throwError(() => ({ error: { message: 'Credencials incorrectes' } })));
    fixture.detectChanges();

    component.form.controls['email'].setValue('wrong@example.com');
    component.form.controls['password'].setValue('wrongpassword');
    fixture.detectChanges();

    const submitBtn: HTMLElement = fixture.nativeElement.querySelector('button[type="submit"]');
    submitBtn.click();
    fixture.detectChanges();

    const errorMsg: HTMLElement = fixture.nativeElement.querySelector('.error');
    expect(errorMsg.textContent).toContain('Credencials incorrectes');
  });
});
