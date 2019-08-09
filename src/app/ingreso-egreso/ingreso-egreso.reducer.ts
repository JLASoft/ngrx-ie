import { IngresoEgreso } from './ingreso-egreso.model';
import { Acciones, SET_ITEMS, UNSET_ITEMS } from './ingreso-egreso-actions';
import { AppState } from '../app.reducer';

export interface IeState
{
    items: Array<IngresoEgreso>;
}

export interface AppState extends AppState
{    
    ie: IeState;
}

const estadoInicial: IeState = 
{
    items: []
}

export function ieReducer(state = estadoInicial, action: Acciones) : IeState
{
    switch(action.type)
    {
        case SET_ITEMS:
            return { items: [...action.items] }; // return { items: [...action.items.map(item => { return { ...item }; } )] };
        case UNSET_ITEMS:
            return { items: [] };

        default:
            return state;
    }
}