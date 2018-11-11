import { AuthService } from './../auth/auth.service';
import { IngresoEgresoService } from './../ingreso-egreso/ingreso-egreso.service';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Appstate } from '../app.reducer';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  constructor(
    public _ingresoEgresoService : IngresoEgresoService,
    private _store : Store<Appstate>
  ) {
  }

  ngOnInit() {
    this._store.select('auth')
        .subscribe(user => {
            console.log(user);
        });
  }

}