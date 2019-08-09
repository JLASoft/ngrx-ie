import { Action } from '@ngrx/store';


export const ON_LOADING = '[UI Loading] INICIO';
export const OFF_LOADING = '[UI Loading] FIN';

export class OnLoadingAction implements Action
{
    readonly type = ON_LOADING;
}

export class OffLoadingAction implements Action
{
    readonly type = OFF_LOADING;
}

export type Acciones = OnLoadingAction | OffLoadingAction;