import { AuthService } from './auth.service';
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private _router : Router,
    private _authService : AuthService
  ) {}

  canActivate() {
    return this._authService.isAuth();
  }
}
