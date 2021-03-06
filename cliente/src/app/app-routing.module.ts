import { AuthGuardService } from './auth/auth-guard.service';
import { NgModule }           from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { AppLoginComponent }     from './auth/login/login.component';
import { AppRegisterComponent }  from './auth/register/register.component';

const routes:Routes =  [
    {path : 'login',    component  : AppLoginComponent},
    {path : 'register', component  : AppRegisterComponent},
    {
        path : '', 
        loadChildren : './ingreso-egreso/ingreso-egreso.module#IngresoEgresoModule',
        canLoad : [AuthGuardService]
    },
    {path : '**',       redirectTo : ''}
]
@NgModule({
    imports : [
        RouterModule.forRoot(routes)
    ],
    exports : [
        RouterModule
    ]
})
export class AppRoutingModule {}