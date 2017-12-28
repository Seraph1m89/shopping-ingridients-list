import * as AuthActionType from "./auth.constants";
import { Action } from "@ngrx/store";

export class Login implements Action {
    readonly type = AuthActionType.LOGIN;
    constructor(public payload: string){}    
}

export class Logout implements Action {
    readonly type = AuthActionType.LOGOUT;
}

export class TryLogin implements Action {
    readonly type = AuthActionType.TRY_LOGIN;
    constructor(public payload: {username: string, password: string}) {}
}

export class TrySignup implements Action {
    readonly type = AuthActionType.TRY_SIGNUP;
    constructor(public payload: {username: string, password: string}) {}
}

export type AuthenticationAction = Logout | Login | TryLogin;