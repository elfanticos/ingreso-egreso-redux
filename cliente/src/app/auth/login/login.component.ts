import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
/**SERVICIOS */
import { AuthService } from './../auth.service';
import { HttpParams } from '@angular/common/http';
@Component({
    selector    : 'app-login',
    templateUrl : './login.component.html',
    styleUrls   : ['login.component.scss'],
    providers   : [AuthService]
})

export class AppLoginComponent  {
    formLogin:FormGroup;
    constructor(
        private _formBuilder : FormBuilder,
        private _authService : AuthService
    ) {
        this.formLogin = this._formBuilder.group({
            'usuario' : [null, [Validators.required, Validators.maxLength(30)]],
            'clave'   : [null, [Validators.required,Validators.maxLength(10)]]
        });
    }

    get usuario() { return this.formLogin.controls['usuario'];}
    get clave() { return this.formLogin.controls['clave'];}


    login():void {
        let params = new HttpParams()
            .set('usuario' , this.usuario.value)
            .set('clave'   , this.clave.value)
        this._authService.login(params).subscribe(result => {
            console.log(result);
        },err => {
            console.log(err);
        });
    }
}