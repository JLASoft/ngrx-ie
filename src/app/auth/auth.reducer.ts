import { User } from './user.model';
import { Acciones, SET_USER, UNSET_USER } from './auth.actions';

export interface AuthState
{
    user: User;
}

const estadoInicial: AuthState = 
{
    user: null
};

export function authReducer(state = estadoInicial, action: Acciones) : AuthState
{
    switch(action.type)
    {
        case SET_USER:
            return { user: { ...action.user } };        
        case UNSET_USER:
                return { user: null };

        default:
            return state;
    }
}