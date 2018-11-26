import { Subscription } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from './ingreso-egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';
import { ItemsMovAction } from './ingreso-egreso.action';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  form : FormGroup;
  cargando:boolean = false;
  subscription:Subscription = new Subscription();
  items_suscription:Subscription = new Subscription();
  user_suscription:Subscription = new Subscription();
  constructor(
    private _store:Store<AppState>,
    public _ingresoEgresoService:IngresoEgresoService
  ) {
    this.form = new FormGroup({
      descripcion : new FormControl(null),
      monto : new FormControl(null),
      tipo : new FormControl('INGRESO')
    });
  }

  ngOnInit():void {
    this.subscription = this._store.select('ui').subscribe(row => {
      this.cargando = row.isLoading;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getChange(tipo:string) {
    this.form.controls['tipo'].setValue(tipo);
  }

  registrarIngresoEgreso():void {
    this._store.dispatch(new ItemsMovAction());
    return;
    this._ingresoEgresoService.insertIngresoEgreso(this.form.value);

  }

}
