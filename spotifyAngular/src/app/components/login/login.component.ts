import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthController } from '../../controllers/auth.controller';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authController: AuthController,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
  
  
      this.authController.loginUser(email, password).subscribe({
        next: (response) => {
          console.log("✅ Login correcte, token rebut:", response.token); 
          localStorage.setItem('token', response.token);
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error("❌ Error en el login:", err);
        },
      });
    }
  }
  
  
}
