import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouteService } from '@services/route.service';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {

  resetPasswordForm: FormGroup;

  constructor(
    public routeService: RouteService,
    private fb: FormBuilder
  ) {
    this.resetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    if (this.resetPasswordForm.valid) {
      console.log('Form Submitted', this.resetPasswordForm.value);
    }
  }

}
