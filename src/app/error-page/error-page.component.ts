import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {

  errorMessage: string;

  constructor(private _activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.errorMessage = this._activeRoute.snapshot.data['message'];
    this._activeRoute.data.subscribe((data: Data) => {
      this.errorMessage = data['message'];
    });
  }
}
