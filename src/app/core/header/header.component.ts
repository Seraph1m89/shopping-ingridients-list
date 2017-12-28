import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from 'firebase';
import { AppState } from '../../store/app.state';
import { Store } from '@ngrx/store';
import { AuthState } from '../../auth/store/auth.reducer';
import { Logout } from '../../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  authState: Observable<AuthState>;

  constructor(private _store: Store<AppState>) {}

  ngOnInit() {
    this.authState = this._store.select("authentication")
  }

  onLogout() {
    this._store.dispatch(new Logout());
  }
}
