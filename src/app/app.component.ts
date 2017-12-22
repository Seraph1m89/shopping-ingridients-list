import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit{
  ngOnInit(): void {
    
  }

  selectedList: string = 'recipes';

  onSwitchList(list: string) {
    this.selectedList = list;
  }

}
