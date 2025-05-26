// src/app/components/login/login.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { AuthService, User } from '../../services/auth.service';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('LoginComponent (TDD)', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authSpy = jasmine.createSpyObj<AuthService>('AuthService', ['login']);
    // Mock: login devuelve un usuario con token
    const fakeUser: User = { id: 1, username: 'u', email: 'e', token: 't' };
    authSpy.login.and.returnValue(of(fakeUser));

    await TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      declarations: [ LoginComponent ],
      providers: [
        { provide: AuthService, useValue: authSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create a form with email & password controls', () => {
    expect(component.form.contains('email')).toBeTrue();
    expect(component.form.contains('password')).toBeTrue();
  });

  it('should mark email and password as invalid if empty', () => {
    const email = component.form.get('email')!;
    const password = component.form.get('password')!;
    email.setValue('');
    password.setValue('');
    expect(email.valid).toBeFalse();
    expect(password.valid).toBeFalse();
  });

  it('should disable submit button when form is invalid', () => {
    component.form.setValue({ email: '', password: '' });
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    expect(btn.disabled).toBeTrue();
  });

  it('should enable submit button when form is valid', () => {
    component.form.setValue({ email: 'a@b.com', password: '123456' });
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    expect(btn.disabled).toBeFalse();
  });

  it('should call AuthService.login on valid form submit', () => {
    component.form.setValue({ email: 'a@b.com', password: '123456' });
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    btn.click();
    expect(authSpy.login).toHaveBeenCalledWith('a@b.com', '123456');
  });
});
