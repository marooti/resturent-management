import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Simulate an authentication check
  isLoggedIn(): boolean {
    return !!localStorage.getItem('userProfile'); // Replace with real auth check logic
  }

  // Simulate a login
  login(user: any) {
    localStorage.setItem('userProfile', JSON.stringify(user));
  }

  // Simulate a logout
  logout() {
    localStorage.removeItem('userProfile');
  }
}
