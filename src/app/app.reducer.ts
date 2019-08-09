import { ActionReducerMap } from '@ngrx/store';


import { UiState, uiReducer } from './shared/ui.reducer';
import { AuthState, authReducer } from './auth/auth.reducer';
// import { IeState, ieReducer } from './ingreso-egreso/ingreso-egreso.reducer';

export interface AppState
{
    ui: UiState;
    auth: AuthState;
    // ie: IeState
}

export const appReducers: ActionReducerMap<AppState> =
{
    ui: uiReducer,
    auth: authReducer,
    // ie: ieReducer
};