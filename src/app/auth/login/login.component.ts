import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppState } from '../../store/app.state';
import { Store } from '@ngrx/store';
import { TryLogin } from '../store/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: '../signup/signup.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  buttonText = "Login";

  constructor(private _store: Store<AppState>) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this._store.dispatch(new TryLogin({username: email, password}))
  }

}
