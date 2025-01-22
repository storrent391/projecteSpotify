import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Create spies for AuthService and Router
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate email and password fields', () => {
    const email = component.loginForm.controls['email'];
    const password = component.loginForm.controls['password'];

    // Email validation
    email.setValue('');
    expect(email.valid).toBeFalse();
    email.setValue('invalid-email');
    expect(email.valid).toBeFalse();
    email.setValue('test@example.com');
    expect(email.valid).toBeTrue();

    // Password validation
    password.setValue('');
    expect(password.valid).toBeFalse();
    password.setValue('123');
    expect(password.valid).toBeFalse();
    password.setValue('123456');
    expect(password.valid).toBeTrue();
  });

  it('should call AuthService login on valid form submission', fakeAsync(() => {
    const email = 'test@example.com';
    const password = 'password123';
    component.loginForm.setValue({ email, password });

    authServiceSpy.login.and.returnValue(of({ success: true }));
    component.onSubmit();

    expect(authServiceSpy.login).toHaveBeenCalledOnceWith(email, password);
    tick();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
  }));


  it('should disable the submit button when the form is invalid', () => {
    const button = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(button.disabled).toBeTrue();

    component.loginForm.setValue({ email: 'test@example.com', password: 'password123' });
    fixture.detectChanges();
    expect(button.disabled).toBeFalse();
  });
});
