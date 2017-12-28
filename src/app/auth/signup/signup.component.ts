import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Submittable } from '../../recipes/Interfaces/submittable.interface';
import { AppState } from '../../store/app.state';
import { Store } from '@ngrx/store';
import { TryLogin } from '../store/auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  buttonText = "Signup";

  constructor(private _store: Store<AppState>) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this._store.dispatch(new TryLogin({username: email, password: password}));
  }

}
