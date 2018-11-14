import { StoreModule } from '@ngrx/store';
import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
/**Componentes */
import { OrdenIngresoEgresoPipe } from './orden-ingreso-egreso.pipe';
import { DetalleComponent }       from './detalle/detalle.component';
import { DashboardComponent }     from './../dashboard/dashboard.component';
import { EstadisticaComponent }   from './estadistica/estadistica.component';
import { IngresoEgresoComponent } from './ingreso-egreso.component';
/**Modulos */
import { SharedModule } from './../shared/shared.module';
/**Routes */
import { DashboardRoutingModule } from './../dashboard/dashboard-routing.module';
import { ingresoEgresoReducer } from './ingreso-egreso.reducer';

/**Angular material */
import {
  MatButtonModule, 
  MatCheckboxModule,
  MatToolbarModule,
  MatSidenavModule,
  MatCardModule
} from '@angular/material';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    DashboardRoutingModule,
    StoreModule.forFeature('ingresoEgreso', ingresoEgresoReducer),
    MatButtonModule, 
    MatCheckboxModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCardModule
  ],
  declarations: [
    DashboardComponent,
    IngresoEgresoComponent,
    DetalleComponent,
    EstadisticaComponent,
    OrdenIngresoEgresoPipe
  ]
})
export class IngresoEgresoModule { }