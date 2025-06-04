// src/app/guards/auth.guard.ts
import { inject, Injectable } from '@angular/core';
import {
  CanActivateFn,
  Router,
  RouterModule,
  UrlTree
} from '@angular/router';

import { AuthService } from '../services/auth.service';

export const AuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = localStorage.getItem('jwtToken');
  if (token) {
    return true;
  }
  return router.createUrlTree(['/login']);
};

// Cal registrar RouterModule en imports dels components que usen <router-outlet> o directives de routing.
// Com que fem bootstrapApplication amb provideRouter, no cal registrar aquí res més.
