import { IngresoEgreso } from './../ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { Appstate } from './../../app.reducer';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromIngresoEgreso from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit {
  ingresos:number;
  egresos:number;
  cuantosIngresos:number;
  cuantosEgresos:number;
  subscription = new Subscription();
  public doughnutChartLabels:string[] = ['Ingresos', 'Egresos'];
  public doughnutChartData:number[] = [];
  public doughnutChartType:string = 'doughnut';
  constructor(
    private _store:Store<fromIngresoEgreso.Appstate>
  ) { }

  ngOnInit() {
    // this.subscription = this._store.select('ingresoEgreso').subscribe(ingresoEgreso => {
    //   this.contarIngresoEgreso(ingresoEgreso.items);
    // });
  }

  contarIngresoEgreso(items:IngresoEgreso[]) {
    // this.ingresos = 0;
    // this.egresos  = 0;

    // this.cuantosEgresos  = 0;
    // this.cuantosIngresos = 0;

    // items.forEach(item => {
    //   if (item.tipo == 'ingreso') {
    //     this.cuantosIngresos++;
    //     this.ingresos += item.monto;
    //   } else {
    //     this.cuantosEgresos++;
    //     this.egresos += item.monto;
    //   }
    // });
    // this.doughnutChartData = [this.ingresos, this.egresos];
  }
}
