import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouteService } from '@services/route.service';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from '@services/toastr.service';
import { FirestoreService } from '@services/firestore.service';
import { user } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    public routeService: RouteService,
    private router: Router,
    private toaster: ToastrService,
    private firestoreService: FirestoreService,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }
  ngOnInit() {

  }

  fetchTimelogData(name: string) {
    this.firestoreService.getuserProfile(name)
      .then((data) => {
        let password = this.loginForm.controls['password'].value;
        console.log('Timelog data:', data);
        if (password === data.password) {
          this.toaster.showSuccess('Login Successful');
          this.router.navigate([this.routeService.dashboard]);
          console.log("this login suucessfully:");

          localStorage.setItem('userProfile', JSON.stringify(data));
        }
        else {
          this.toaster.showError('Login Failed');
          return;
        }
      })
      .catch((error: any) => {
        console.error('Error fetching timelog data:', error);
      });
  }
  onSubmit(): void {
    if (this.loginForm.valid) {
      let userName = this.loginForm.controls['email'].value;
      this.fetchTimelogData(userName);

    } else {
      this.toaster.showError('Login Failed');
    }
  }

}
