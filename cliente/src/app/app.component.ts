import { AuthService } from './auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers : [AuthService]
})
export class AppComponent implements OnInit {
  title = 'cliente';
  constructor(
    private _authService : AuthService
  ){}

  ngOnInit():void {
    this._authService.validatorToken();
  }
}
