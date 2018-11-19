import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  constructor(
    public _authService : AuthService
  ) { }

  ngOnInit() {
  }

  onSubmit(data:any) {
    this._authService.crearUsuario(data);
  }

}
