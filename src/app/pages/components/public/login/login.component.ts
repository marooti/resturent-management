import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouteService } from '@services/route.service';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from '@services/toastr.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(
    public routeService: RouteService,
    private router: Router,
    private toaster: ToastrService,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.toaster.showSuccess('Login Successful');
      this.router.navigate([this.routeService.dashboard]);
    } else {
      this.toaster.showError('Login Failed');
    }
  }

}
