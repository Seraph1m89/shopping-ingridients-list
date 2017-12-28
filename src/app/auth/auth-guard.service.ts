import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { AppState } from "../store/app.state";
import { Store } from "@ngrx/store";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private _store: Store<AppState>) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        return this._store.select("authentication").map(state => state.isLoggedIn);
    }

}