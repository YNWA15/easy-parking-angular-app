import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationServices } from './authentication-services';

@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthenticationServices, private router: Router) { }

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      localStorage.removeItem('email');
      sessionStorage.removeItem('token');
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
