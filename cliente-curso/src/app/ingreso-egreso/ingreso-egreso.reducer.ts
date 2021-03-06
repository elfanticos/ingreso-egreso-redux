import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso }      from './ingreso-egreso.model';
import * as fromIngresoEgreso from './ingreso-egreso.action';

export interface IngresoEgresoState {
    items : IngresoEgreso[]
}

const estadoInicial:IngresoEgresoState = {
    items : []
};

export function ingresoEgresoReducer(state = estadoInicial, action:fromIngresoEgreso.acciones):IngresoEgresoState {
    switch (action.type) {
        case fromIngresoEgreso.SET_ITEMS:
            return {
                items : [
                    ...action.items.map(item => {
                        return {
                            ...item
                        };
                    })
                ]
            }
        case fromIngresoEgreso.UNSET_ITEMS:
            return {
                items : []
            }
        case fromIngresoEgreso.ITEMS_MOV:
            return state;
            case fromIngresoEgreso.ITEMS_MOV_CHANGE:
            return state;
        default:
            return state;
    }
}
