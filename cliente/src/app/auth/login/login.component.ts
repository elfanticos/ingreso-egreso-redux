import { Appstate } from './../../app.reducer';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
/**SERVICIOS */
import { AuthService } from './../auth.service';
import { User } from '../user.model';
@Component({
    selector    : 'app-login',
    templateUrl : './login.component.html',
    styleUrls   : ['login.component.scss'],
    providers   : [AuthService]
})

export class AppLoginComponent implements OnInit {
    formLogin:FormGroup;
    constructor(
        private _formBuilder : FormBuilder,
        private _authService : AuthService,
        private _store : Store<Appstate>
    ) {
        this.formLogin = this._formBuilder.group({
            'usuario' : [null, [Validators.required, Validators.maxLength(30)]],
            'clave'   : [null, [Validators.required,Validators.maxLength(10)]]
        });
    }

    ngOnInit():void {
        this._store.select('auth')
        .subscribe(user => {
            console.log(user);
        });
    }

    get usuario() { return this.formLogin.controls['usuario'];}
    get clave() { return this.formLogin.controls['clave'];}


    login():void {
        this._authService.login(this.usuario.value, this.clave.value);
    }
}