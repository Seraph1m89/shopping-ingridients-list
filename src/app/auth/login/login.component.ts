import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: '../signup/signup.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  buttonText = "Login";

  constructor(private _authService: AuthenticationService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this._authService.login(email, password);
  }

}
