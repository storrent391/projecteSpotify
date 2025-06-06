// src/app/components/register/register.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { of, throwError } from 'rxjs';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['register']);

    await TestBed.configureTestingModule({
      imports: [
        RegisterComponent,
        ReactiveFormsModule
      ],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: authServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the register component', () => {
    expect(component).toBeTruthy();
  });

  it('should have form invalid when required fields are empty', () => {
    component.form.controls['username'].setValue('');
    component.form.controls['email'].setValue('');
    component.form.controls['password'].setValue('');
    expect(component.form.valid).toBeFalse();

    const submitBtn: HTMLButtonElement = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(submitBtn.disabled).toBeTrue();
  });

  it('should enable the button when valid data is provided', () => {
    component.form.controls['username'].setValue('user');
    component.form.controls['email'].setValue('test@example.com');
    component.form.controls['password'].setValue('password123');
    fixture.detectChanges();

    expect(component.form.valid).toBeTrue();

    const submitBtn: HTMLButtonElement = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(submitBtn.disabled).toBeFalse();
  });

  it('should call register when form is submitted with valid data', () => {
    authServiceSpy.register.and.returnValue(of({ message: 'Usuari creat', user: { id: 'user1', username: 'user', email: 'test@example.com' }}));

    component.form.controls['username'].setValue('user');
    component.form.controls['email'].setValue('test@example.com');
    component.form.controls['password'].setValue('password123');
    fixture.detectChanges();

    const submitBtn: HTMLElement = fixture.nativeElement.querySelector('button[type="submit"]');
    submitBtn.click();
    fixture.detectChanges();

    expect(authServiceSpy.register).toHaveBeenCalledWith( 'user',  'test@example.com',  'password123');
  });

  it('should display error message on registration failure', () => {
    authServiceSpy.register.and.returnValue(throwError(() => ({ error: { message: 'Correu ja en ús' } })));

    component.form.controls['username'].setValue('user');
    component.form.controls['email'].setValue('test@example.com');
    component.form.controls['password'].setValue('password123');
    fixture.detectChanges();

    const submitBtn: HTMLElement = fixture.nativeElement.querySelector('button[type="submit"]');
    submitBtn.click();
    fixture.detectChanges();

    const errorMsg: HTMLElement = fixture.nativeElement.querySelector('.error');
    expect(errorMsg.textContent).toContain('Correu ja en ús');
  });
});
