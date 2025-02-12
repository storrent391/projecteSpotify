import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthController {
  constructor(private authService: AuthService) {}

  loginUser(email: string, password: string) {
    return this.authService.login(email, password);
  }

  registerUser(email: string, password: string) {
    return this.authService.register(email, password);
  }

  logoutUser() {
    this.authService.logout();
  }
}
