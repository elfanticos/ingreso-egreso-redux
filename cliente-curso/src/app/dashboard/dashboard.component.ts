import { Component, OnInit, OnDestroy } from '@angular/core';
import { IngresoEgresoService } from '../ingreso-egreso/ingreso-egreso.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter, map } from 'rxjs/operators';
import { ItemsMovAction } from '../ingreso-egreso/ingreso-egreso.action';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit, OnDestroy {
  user_subscription: Subscription = new Subscription();
  item_subscription: Subscription = new Subscription();
  constructor(
    public _ingresoEgresoService:IngresoEgresoService,
    private _store:Store<AppState>
  ) { }

  ngOnInit():void {
    /**Usuario */
    this.user_subscription = this._store.select('auth')
    .pipe(
      filter(fil => fil.user != null),
      map(row => row.user)
    )
    .subscribe(user => {
      this._ingresoEgresoService.getIngresoEgresoByPersona(user.id_persona);
    });

    /**Ingreso Y egreso */
    this.item_subscription = this._store.select('ingresoEgreso').subscribe(row => {
      this._ingresoEgresoService.setItems = row.items;
    });
  }

  ngOnDestroy():void {
    this.user_subscription.unsubscribe();
    this.item_subscription.unsubscribe();
  }

}
