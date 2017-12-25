import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  ViewChild
} from '@angular/core';

import { Ingredient } from "../../../shared/ingridient"
import { ShoppingListService } from '../../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  private _subscriptions: Subscription[] = [];
  private _editItemIndex: number;

  editMode = false;
  @ViewChild('f') form: NgForm;

  constructor(private _shoppingListService: ShoppingListService) { }

  ngOnInit() {
    let subscription = this._shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this._editItemIndex = index;
        let subscription = this._shoppingListService.getIngridient(index)
          .subscribe(ingredient => {
            if (ingredient) {
              this.form.setValue({
                name: ingredient.name,
                amount: ingredient.amount
              });
            }
          });
        this._subscriptions.push(subscription);
      });
    this._subscriptions.push(subscription);
  }

  ngOnDestroy() {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  onAddItem(form: NgForm) {
    const newIngredient = this.populateIngridient(form);
    this._shoppingListService.addIngridient(newIngredient);
    this.resetEditing();
  }

  onUpdateItem(form: NgForm) {
    const newIngridient = this.populateIngridient(form);
    this._shoppingListService.updateIngredient(this._editItemIndex, newIngridient);
    this.resetEditing();
  }

  private populateIngridient(form: NgForm): Ingredient {
    const { name, amount } = form.value;
    return new Ingredient(name, amount);
  }

  resetEditing() {
    this.form.reset();
    this._editItemIndex = null;
    this.editMode = false;
  }

  onDeleteItem() {
    this._shoppingListService.deleteIngridient(this._editItemIndex);
    this.resetEditing();
  }
}
