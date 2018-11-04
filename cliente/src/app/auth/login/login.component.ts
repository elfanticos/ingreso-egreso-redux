import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector : 'app-login',
    templateUrl : './login.component.html',
    styleUrls : ['login.component.scss']
})

export class AppLoginComponent  {
    formLogin:FormGroup;
    constructor(
        private _formBuilder : FormBuilder
    ) {
        this.formLogin = this._formBuilder.group({
            'usuario' : [null, [Validators.required, Validators.maxLength(30)]],
            'clave'   : [null, [Validators.required,Validators.maxLength(10)]]
        });
    }


    login():void {
        
    }
}