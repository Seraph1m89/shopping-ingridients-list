import * as firebase from 'firebase'
import { Observable } from 'rxjs/Observable';
import { OnInit, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from 'firebase';
import { Router } from '@angular/router';
import { AppState } from '../store/app.state';
import { Store } from '@ngrx/store';
import { AuthState } from './store/auth.reducer';
import { Login, Logout } from './store/auth.actions';

@Injectable()
export class AuthenticationService {
    private _authState: Observable<AuthState>;

    constructor(private _router: Router, private _store: Store<AppState>) {
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

    signupUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .catch(error => console.log(error));
    }

    login(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(responce => this._router.navigate(["/"]))
        .catch(error => console.log(error));
    }

    logout() {
        return firebase.auth().signOut();
    }

    getToken() {
        return this._authState.take(1).map(state => state.token);
    }

    isAuthenticated() {
        return this._authState.map(state => state.isLoggedIn);
    }
}