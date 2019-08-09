import { Acciones, ON_LOADING, OFF_LOADING } from './ui.actions';

export interface UiState
{
    isLoading: boolean
}

const initState: UiState = 
{
    isLoading: false
}

export function uiReducer(state = initState, action: Acciones) : UiState
{
    switch(action.type)
    {
        case ON_LOADING:
            return { isLoading: true };
        case OFF_LOADING:
            return { isLoading: false};

        default:
            return state;
    }
}