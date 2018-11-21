import { User } from './user.model';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Router } from '@angular/router';

/**Message alerta */
import Swal from 'sweetalert2';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.action';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { SetUserAction, UnSetUserAction } from './auth.action';


@Injectable({
  providedIn: 'root'
})
export class AuthService  {
  url:string;
  private user:User = null;
  constructor(
    public _httpClient: HttpClient,
    private _router:Router,
    private _store : Store<AppState>
  ) {
    this.url = 'http://localhost:3000/auth/';
  }


  get userSession() {
    return this.user;
  }

  crearUsuario(data:any):void {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
     /**Activar carga */
     this._store.dispatch(new ActivarLoadingAction());
    this._httpClient.post(this.url+'crearUsuario',data, { headers: headers }).subscribe((res:any) => {
      /**Desactivar carga y redireccionar al dashboard */
      this._store.dispatch(new DesactivarLoadingAction());
      /**Cargando la informacion del usuario */
      this._store.dispatch(new SetUserAction(res.user));
      this.user = res.user;
      localStorage.setItem('token', res.token);
      this._router.navigate(['/']);
    },err => {
      Swal('Error al crear usuario', err.error ? err.error.msj : 'No se encontro la página', 'error');
      /**Desactivar carga y redireccionar al dashboard */
      this._store.dispatch(new DesactivarLoadingAction());
      /**Cargando la informacion del usuario */
      this._store.dispatch(new SetUserAction(null));
    });
  }

  login(data:any):void {
    let params = new HttpParams()
        .set('usuario' , data.usuario)
        .set('clave'   , data.clave);
    /**Activar carga */
    this._store.dispatch(new ActivarLoadingAction());
    this._httpClient.get(`${this.url}login`, {params : params}).subscribe((res:any) => {
      /**Desactivar carga y redireccionar al dashboard */
      this._store.dispatch(new DesactivarLoadingAction());
     /**Cargando la informacion del usuario */
     this._store.dispatch(new SetUserAction(res.user));
     this.user = res.user;
      /**Guardar token en local*/
      localStorage.setItem('token', res.token);
      this._router.navigate(['/']);
    },err => {
      /**Cargando la informacion del usuario */
     this._store.dispatch(new SetUserAction(null));
      Swal('Error al ingresar', err.error ? err.error.msj : 'No se encontro la página', 'error');
        /**Desactivar carga y redireccionar al dashboard */
        this._store.dispatch(new DesactivarLoadingAction());
    });
  }

  logout():void {
    localStorage.clear();
    this._store.dispatch(new UnSetUserAction());
    this._router.navigate(['/login']);
  }

  isAuth():boolean {
    /**Validar el token del usuario */
    if (localStorage.getItem('token')) {
      return true;
    } else {
      this._router.navigate(['/login']);
      return false;
    }
  }

  validatorToken():void {
    if (!localStorage.getItem('token')) {
      this._router.navigate(['/login']);
      return;
    }
    let params = new HttpParams()
        .set('token' , localStorage.getItem('token'));
    /**Activar carga */
    this._store.dispatch(new ActivarLoadingAction());
    
    this._httpClient.get(`${this.url}validatorToken`, {params : params}).subscribe((result:any) => {
        /**Desactivar carga y redireccionar al dashboard */
        this._store.dispatch(new DesactivarLoadingAction());
        this._store.dispatch(new SetUserAction(result.user));
        this.user = result.user;
        /**Guardar token en local*/
        localStorage.setItem('token', result.token);
    },err => {
        /**Desactivar carga y redireccionar al dashboard */
        this._store.dispatch(new DesactivarLoadingAction());
    });
}
}
