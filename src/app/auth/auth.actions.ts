import { Action } from '@ngrx/store';
import { User } from './user.model';

export const SET_USER = '[Auth] SET USER';
export const UNSET_USER = '[Auth] UNSET USER';

export class SetUserAction implements Action
{
    readonly type = SET_USER;

    public constructor(public user: User) { }
}

export class UnsetUserAction implements Action
{
    readonly type = UNSET_USER;
}

export type Acciones = SetUserAction | UnsetUserAction;