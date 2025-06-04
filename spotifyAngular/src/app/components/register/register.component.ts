// src/app/components/auth/register/register.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  errorMsg: string = '';
  successMsg: string = '';
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const { username, email, password } = this.form.value;
    this.authService.register(username, email, password).subscribe({
      next: resp => {
        this.successMsg = resp.message;
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: err => {
        this.errorMsg = err.error?.message || 'Error en el registre';
      }
    });
  }
}
