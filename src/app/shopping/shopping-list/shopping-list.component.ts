import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { Ingredient } from '../../shared/ingridient';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  private _subscriptions: Subscription[] = [];

  ingredients: Ingredient[];

  constructor(private _shoppingListService: ShoppingListService) { }

  onEditItem(index: number) {
    this._shoppingListService.startedEditing.next(index);
  }

  ngOnInit() {
    this.ingredients = this._shoppingListService.getIngredients();
    var subsctiption = this._shoppingListService.ingredientsChanged.subscribe((ingredients) => this.onIngredientsChanged(ingredients));
    this._subscriptions.push(subsctiption);
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private onIngredientsChanged(ingredients: Ingredient[]) {
    this.ingredients = ingredients;
  }
}
