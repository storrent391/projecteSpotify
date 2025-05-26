// src/app/guards/auth.guard.spec.ts

import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { provideRouter } from '@angular/router';


describe('AuthGuard (TDD)', () => {
  let guard: AuthGuard;
  let authSpy: jasmine.SpyObj<AuthService>;
  let router: Router;

  beforeEach(() => {
    authSpy = jasmine.createSpyObj('AuthService', ['isAuthenticated']);

    TestBed.configureTestingModule({
      
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: authSpy }
      ]
    });

    guard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
  });

  it('should allow activation when authenticated', () => {
    authSpy.isAuthenticated.and.returnValue(true);

    const result = guard.canActivate({} as any, { url: '/protected' } as any);

    expect(result).toBeTrue();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should block activation and redirect to /login when not authenticated', () => {
    authSpy.isAuthenticated.and.returnValue(false);

    const result = guard.canActivate({} as any, { url: '/protected' } as any);

    expect(result).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(
      ['login'],
      { queryParams: { returnUrl: '/protected' } }
    );
  });
});
