import { Injectable, OnInit } from "@angular/core";
import {Actions, Effect} from '@ngrx/effects';
import { ITEMS_MOV, ItemsMovChangeAction } from "./ingreso-egreso.action";
import { switchMap, map } from "rxjs/operators";
import { IngresoEgresoService } from "./ingreso-egreso.service";
import { of } from "rxjs";

@Injectable()
export class movimientosEffects {
    constructor(
        private actions$ : Actions,
        private _ingresoEgresoService : IngresoEgresoService
    ) {}
    @Effect() cargarItemsMov = this.actions$.ofType(ITEMS_MOV)
        .pipe(
            switchMap(() => {
                return of([1,2,3])
                        .pipe(
                            map(row => {
                                console.log(row);
                                return new ItemsMovChangeAction()
                            })
                        );
            })
        );
;
}