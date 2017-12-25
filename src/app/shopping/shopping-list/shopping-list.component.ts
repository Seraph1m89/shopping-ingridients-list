import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { Ingredient } from '../../shared/ingridient';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ShoppingListState } from '../store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  shoppingListState: Observable<ShoppingListState>;

  constructor(private _shoppingListService: ShoppingListService) { }

  onEditItem(index: number) {
    this._shoppingListService.startedEditing.next(index);
  }

  ngOnInit() {
    this.shoppingListState = this._shoppingListService.getIngredients();
  }
}
