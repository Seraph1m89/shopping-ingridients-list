import { AuthenticationAction } from "./auth.actions";
import * as AuthAction from "./auth.constants";

export interface AuthState {
    isLoggedIn: boolean,
    token: string
}

const initialState: AuthState = {
    isLoggedIn: false,
    token: null
}

export function authReducer(state = initialState, action: AuthenticationAction) {
    switch (action.type) {
        case AuthAction.LOGIN:
            return {
                ...state,
                isLoggedIn: true,
                token: action.payload
            }
        case AuthAction.LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                token: null
            }
        default:
            return state
    }
}