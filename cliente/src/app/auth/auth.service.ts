import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Router } from '@angular/router';
/**NGRX */
import {Store} from '@ngrx/store';
/**Modelos */
import { User } from './user.model';
import { Appstate } from '../app.reducer';
/**Acciones */
import { ActivarLoadingAction, DesactivarLoadingAction } from './../shared/ui.acctions';
import { SetUserAction, UnsetUserAction } from './auth.actions';
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    url:string;
    constructor(
        public _httpClient: HttpClient,
        private _store:Store<Appstate>,
        private _router:Router
    ) {
        this.url = 'http://localhost:3000/auth/';
    }

    login(usuario:string, clave:string):void {
        let params = new HttpParams()
            .set('usuario' , usuario)
            .set('clave'   , clave);
        /**Activar carga */
        this._store.dispatch(new ActivarLoadingAction());
        this._httpClient.get(`${this.url}login`, {params : params}).subscribe((result:any) => {
            /**Desactivar carga y redireccionar al dashboard */
            this._store.dispatch(new DesactivarLoadingAction());
            /**Cargar datos de usuario en session */
            this._store.dispatch(new SetUserAction(result.user));
            /**Guardar token en local*/
            localStorage.setItem('token', result.token);
            this._router.navigate(['/']);
        },err => {
            /**Desactivar carga y redireccionar al dashboard */
            this._store.dispatch(new DesactivarLoadingAction());
        });
    }

    validatorToken():void {
        let params = new HttpParams()
            .set('token' , localStorage.getItem('token'));
        /**Activar carga */
        this._store.dispatch(new ActivarLoadingAction());
        
        this._httpClient.get(`${this.url}validatorToken`, {params : params}).subscribe((result:any) => {
            /**Desactivar carga y redireccionar al dashboard */
            this._store.dispatch(new DesactivarLoadingAction());
            this._store.dispatch(new SetUserAction(result.user));
            /**Guardar token en local*/
            localStorage.setItem('token', result.token);
        },err => {
            /**Desactivar carga y redireccionar al dashboard */
            this._store.dispatch(new DesactivarLoadingAction());
        });
    }

    isAuth() {
        /**Validar el token del usuario */
        if (!localStorage.getItem('token')) {
            this._router.navigate(['/login']);
            return false;
        }
        return true;
        // return this._afAuth.authState
        //   .pipe(
        //     map( fbUser => {
        //       if(!fbUser) {
        //         /**Redireccionar al login si el usuario no existe en sesión */
        //         this._router.navigate(['/login']);
        //       }
        //       return fbUser != null;
        //     })
        //   );
      }
}
