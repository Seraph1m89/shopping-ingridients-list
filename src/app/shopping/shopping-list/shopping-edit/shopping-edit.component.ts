import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  ViewChild
} from '@angular/core';

import {Ingredient} from "../../../shared/ingridient"
import { ShoppingListService } from '../../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  private _subscription: Subscription;
  private _editItemIndex: number;
  private _editedItem: Ingredient;

  editMode = false;
  @ViewChild('f') form: NgForm;

  constructor(private _shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this._subscription = this._shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this._editItemIndex = index;
        this._editedItem = this._shoppingListService.getIngridient(index);
        this.form.setValue({
          name: this._editedItem.name,
          amount: this._editedItem.amount
        });
    });
  }

  ngOnDestroy() {
    this._subscription.unsubscribe;
  }

  onAddItem(form: NgForm) {
    console.log(form);
    const newIngredient = this.populateIngridient(form);
    this._shoppingListService.addIngridient(newIngredient);
    this.resetEditing();
  }

  onUpdateItem(form: NgForm) {
    const newIngridient = this.populateIngridient(form);
    this._shoppingListService.updateIngredient(this._editItemIndex, newIngridient);
    this.resetEditing();
  }

  private populateIngridient(form: NgForm) : Ingredient {
    const values = form.value;
    return new Ingredient(values['name'], values['amount']);
  }

  resetEditing() {
    this.form.reset();
    this._editedItem = null;
    this._editItemIndex = null;
    this.editMode = false;
  }

  onDeleteItem() {
    this._shoppingListService.deleteIngridient(this._editItemIndex);
    this.resetEditing();
  }
}
