import * as firebase from 'firebase'
import { Observable } from 'rxjs/Observable';
import { OnInit, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from 'firebase';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {
    authenticationChanged = new Subject<User>();

    constructor(private _router: Router) {
        if (!firebase.apps.length) {
            firebase.initializeApp({
                apiKey: "AIzaSyDeKKNP0if90CNJ46fBa6JQgO7Cw02RPOo",
                authDomain: "recipe-list-2caaa.firebaseapp.com",
            });
        }
        
        firebase.auth().onAuthStateChanged(user => this.authenticationChanged.next(user));
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
        return Observable.fromPromise(firebase.auth().currentUser.getIdToken());
    }

    isAuthenticated() {
        if(!firebase.auth().currentUser) {
            return false;
        } else {
            return true;
        }
    }
}