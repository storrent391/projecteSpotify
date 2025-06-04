// src/app/components/auth/login/login.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  errorMsg: string = '';
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const { email, password } = this.form.value;
    this.authService.login(email, password).subscribe({
      next: resp => {
        const token = resp.token;
        
        const decoded: any = jwtDecode(token);
        const user = {
          id: decoded.Id,
          username: '', 
          email: decoded.Email
        };
        this.authService.setCurrentUser(user);
        this.router.navigate(['/']);
      },
      error: err => {
        this.errorMsg = err.error?.message || 'Error en el login';
      }
    });
  }
}
