import { Action } from '@ngrx/store';
import { IngresoEgreso } from './ingreso-egreso.model';


export const SET_ITEMS   = '[Ingreso Egreso] Set Items';
export const UNSET_ITEMS = '[Ingreso Egreso] Unset Items';
export const ITEMS_MOV   = '[Ingreso Egreso Effects] Items';
export const ITEMS_MOV_CHANGE = '[Ingreso Egreso Effects] Items change';

export class SetItemsAction implements Action {
    readonly type = SET_ITEMS;
    constructor(public items:IngresoEgreso[]) {}
}

export class UnSetItemsAction implements Action {
    readonly type = UNSET_ITEMS;
}

export class ItemsMovAction implements Action {
    readonly type = ITEMS_MOV;
}

export class ItemsMovChangeAction implements Action {
    readonly type = ITEMS_MOV_CHANGE;
}
export type acciones = SetItemsAction | UnSetItemsAction | ItemsMovAction | ItemsMovChangeAction;