import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from '../auth/auth.service';
import { Observable } from 'rxjs/Observable';
import { User } from 'firebase';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // @Output() switchList = new EventEmitter<string>();

  isAuthenticated: boolean;

  constructor(private _authService: AuthenticationService) { }

  ngOnInit() {
    // this._authService.isAuthenticated().subscribe(result => this.isAuthenticated = result);
    this._authService.authenticationChanged.subscribe((user: User) => {
      user ? this.isAuthenticated = true : this.isAuthenticated = false;
    });
  }

  onLogout() {
    this._authService.logout();
  }

  // onSwitchList(list: string) {
  //   this.switchList.emit(list);
  // }
}
