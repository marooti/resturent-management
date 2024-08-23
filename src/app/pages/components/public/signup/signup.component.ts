import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouteService } from '@services/route.service';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  signUpForm: FormGroup;

  constructor(
    public routeService: RouteService,
    private fb: FormBuilder
  ) {
    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      terms: [false, Validators.requiredTrue]
    });
    // }, { validators: this.passwordMatchValidator });
  }

  onSubmit(): void {
    if (this.signUpForm.valid) {
      console.log('Form Submitted', this.signUpForm.value);
    }
  }
}