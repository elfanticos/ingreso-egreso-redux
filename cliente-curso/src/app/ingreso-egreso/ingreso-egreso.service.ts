import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Router } from '@angular/router';

/**Message alerta */
import Swal from 'sweetalert2';
/**REDUX */
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { SetItemsAction, UnSetItemsAction } from './ingreso-egreso.action';
import { IngresoEgreso } from './ingreso-egreso.model';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.action';
import { AuthService } from '../auth/auth.service';
/**REDUCER - ACTIONS */


@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService implements OnInit, OnDestroy {
  url:string;
  private items :IngresoEgreso[] = [];
  constructor(
    public _httpClient: HttpClient,
    private _router:Router,
    private _store : Store<AppState>,
    public _authService: AuthService
  ) {
    this.url = 'http://localhost:3000/ingreso_egreso/';
  }

  ngOnInit():void {
  }

  ngOnDestroy():void {
  }

  set setItems (items:IngresoEgreso[]) {
    this.items = items;
  }
  getIngresoEgresoByPersona(id_persona:any):void {
    let params = new HttpParams()
        .set('token' , localStorage.getItem('token'))
        .set('id_persona' , id_persona);
    this._httpClient.get(this.url+'getIngresoEgresos', {params : params}).subscribe((res:any) => {
      this._store.dispatch(new SetItemsAction(res));
    },err => {
      this._store.dispatch(new UnSetItemsAction());
      Swal('Error al cargar dashboard', err.error ? err.error.msj : 'No se encontro la página', 'error');
    });
  }

  deleteIngresoEgreso(item:IngresoEgreso, items:IngresoEgreso[]) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let obj = {
      token : localStorage.getItem('token'),
      id    : item.id
    }
    /**Activar carga */
    this._store.dispatch(new ActivarLoadingAction());

    this._httpClient.post(this.url+'deleteIngresoEgreso',obj, { headers: headers }).subscribe((res:any) => {
    Swal('Eliminar', res.msj, 'success');
    this._store.dispatch(new DesactivarLoadingAction());

    /**Construir nuevo registros de ingreso y egreso */
    this._store.dispatch(new SetItemsAction(items.filter(fil => fil.id != item.id)));

    },err => {
      console.log(err);
      Swal('Error al eliminar', err.error ? err.error.msj : 'No se encontro la página', 'error');

      /**Desactivar carga y redireccionar al dashboard */
      this._store.dispatch(new DesactivarLoadingAction());
    });
  }

  insertIngresoEgreso(item:IngresoEgreso) {
    const user = this._authService.userSession;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let obj = {
      token : localStorage.getItem('token'),
      item  : {...item, _id_persona : user.id_persona} 
    }
    /**Activar carga */
    this._store.dispatch(new ActivarLoadingAction());

    this._httpClient.post(this.url+'insertIngresoEgreso',obj, { headers: headers }).subscribe((res:any) => {
    item = res.data;
    this._store.dispatch(new DesactivarLoadingAction());
    /**Construir nuevo registros de ingreso y egreso */
    this._store.dispatch(new SetItemsAction([item, ...this.items]));
    this._router.navigate(['/detalle']);
    },err => {
      Swal('Error al insertar', err.error ? err.error.msj : 'No se encontro la página', 'error');
      /**Desactivar carga y redireccionar al dashboard */
      this._store.dispatch(new DesactivarLoadingAction());
    });
  }
}
