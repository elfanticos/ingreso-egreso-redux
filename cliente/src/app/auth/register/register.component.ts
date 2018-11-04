import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector : 'app-register',
    templateUrl : './register.component.html',
    styleUrls : ['register.component.scss']
})

export class AppRegisterComponent  {
    formLogin:FormGroup;
    constructor(
        private _formBuilder : FormBuilder
    ) {
        this.formLogin = this._formBuilder.group({
            'usuario' : [null, [Validators.required, Validators.maxLength(30)]],
            'clave'   : [null, [Validators.required,Validators.maxLength(10)]]
        });
    }
}