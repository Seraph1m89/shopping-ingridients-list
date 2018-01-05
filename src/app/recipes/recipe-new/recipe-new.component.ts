import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { FormInitizable } from '../Interfaces/form-initializer.interface';
import { Recipe } from '../recipe.model';
import { Submittable } from '../Interfaces/submittable.interface';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { RecipesState } from '../store/recipe.reducer';
import { AddRecipe, TryAddRecipe } from '../store/recipes.actions';

@Component({
  selector: 'app-recipe-new',
  templateUrl: './recipe-new.component.html',
  styleUrls: ['./recipe-new.component.css']
})
export class RecipeNewComponent implements OnInit, FormInitizable, Submittable {

  recipeForm: FormGroup;  

  protected _recipeState: Store<RecipesState>;

  constructor(protected _router: Router, protected _store: Store<AppState>) { }

  ngOnInit() {
    this._recipeState = this._store.select("recipes");
    this.initializeForm();
  }

  onSubmit() {
    this.addRecipe(this.recipeForm.value);
  }

  initializeForm() {
    this.recipeForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'imagePath': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'ingredients': new FormArray([])
    });
  }

  navigateToDetails(id) {
    this._router.navigate(['/recipes', id]);
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(this.createIngredientForm(null, null));
  }

  private addRecipe(recipe: Recipe) {
    this._store.dispatch(new TryAddRecipe(recipe));
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onCancel() {
    this._router.navigate(["/"]);
  }

  protected createIngredientForm(name: string, amount: number): FormGroup {
    return new FormGroup({
      'name': new FormControl(name, Validators.required),
      'amount': new FormControl(amount, [Validators.required, Validators.pattern(/^\d+$/)])
    })
  }
}
