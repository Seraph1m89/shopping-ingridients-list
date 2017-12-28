import { Effect, Actions } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import * as AuthAction from "./auth.constants";
import { TryLogin, TrySignup, Login, Logout } from "./auth.actions";
import * as firebase from "firebase";
import { Observable } from "rxjs/Observable";
import { switchMap } from "rxjs/operators/switchMap";
import { AuthState } from "./auth.reducer";
import { Store } from "@ngrx/store";
import { AppState } from "../../store/app.state";

@Injectable()
export class AuthEffects {
    private _authState: Store<AuthState>;
    constructor(private _actions$: Actions, private _store: Store<AppState>) { 
        if (!firebase.apps.length) {
            firebase.initializeApp({
                apiKey: "AIzaSyDeKKNP0if90CNJ46fBa6JQgO7Cw02RPOo",
                authDomain: "recipe-list-2caaa.firebaseapp.com",
            });
        }
        
        this._authState = this._store.select("authentication");
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                user.getIdToken()
                 .then((token: string) => this._store.dispatch(new Login(token)));
            } else {
                this._store.dispatch(new Logout())
            }
        });
    }    

    @Effect()
    authLogin = this._actions$
        .ofType(AuthAction.TRY_LOGIN)
        .map((action: TryLogin) => action.payload)
        .switchMap((payload: { username: string, password: string }) =>
            Observable.fromPromise(firebase.auth().signInWithEmailAndPassword(payload.username, payload.password)))
        .switchMap(() => 
            Observable.fromPromise(firebase.auth().currentUser.getIdToken()))
        .map((token: string) => { return {
            type: AuthAction.LOGIN,
            payload: token
        }});

    @Effect()
    authSignup = this._actions$
        .ofType(AuthAction.TRY_SIGNUP)
        .map((action: TrySignup) => {
            return action.payload;
        })
        .switchMap((payload: { username: string, password: string }) => {
            return Observable.fromPromise(
                firebase.auth().createUserWithEmailAndPassword(
                    payload.username, payload.username))
        })
        .switchMap(() => Observable.fromPromise(firebase.auth().currentUser.getIdToken()))
        .map((token: string) => {
            return {
                type: AuthAction.LOGIN,
                payload: token
            }
        });
}