import * as AuthActionType from "./auth.constants";
import { Action } from "@ngrx/store";

export class Login implements Action {
    readonly type = AuthActionType.LOGIN;
    constructor(public payload: string){}    
}

export class Logout implements Action {
    readonly type = AuthActionType.LOGOUT;
}

export type AuthenticationAction = Logout | Login;