import { AuthService } from './auth/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cliente-curso';
  constructor(
    public _authService : AuthService
  ) {}
  ngOnInit():void {
    this._authService.validatorToken();
  }
}
