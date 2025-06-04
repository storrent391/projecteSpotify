// src/app/app.component.ts
import { Component, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  // Getter para saber si hay token
  get isLoggedIn(): boolean {
    return !!localStorage.getItem('jwtToken');
  }

  logout(): void {
    this.authService.logout();
    // Opcionalmente, redirigir a home o login
    this.router.navigate(['/login']);
  }
}
