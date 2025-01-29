import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token'); // Verifica si hay un token válido
    if (token) {
      return true;
    } else {
      this.router.navigate(['/auth/login']); // Redirige al login si no está autenticado
      return false;
    }
  }
}
