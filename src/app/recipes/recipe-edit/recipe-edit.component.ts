import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeNewComponent } from '../recipe-new/recipe-new.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { TryUpdateRecipe } from '../store/recipes.actions';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: '../recipe-new/recipe-new.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent extends RecipeNewComponent {

  recipe: Recipe;

  constructor(private _activeRoute: ActivatedRoute, router: Router, store: Store<AppState>) {
    super(router, store);
  }

  onSubmit() {
    var id = this._activeRoute.snapshot.params['id'];
    this.updateRecipe(id, this.recipeForm.value);
  }

  navigateToDetails() {
    var id = this._activeRoute.snapshot.params['id'];
    this._router.navigate(["recipes", id]);
  }

  ngOnInit() {
    this._activeRoute.data.subscribe((data: { recipe: Recipe }) => {
      this.recipe = data.recipe;
    });
    super.ngOnInit();
  }

  onCancel() {
    this._router.navigate(["../"], {relativeTo: this._activeRoute});
  }

  private updateRecipe(id: string, recipeData: Recipe) {
    recipeData.id = id;
    this._store.dispatch(new TryUpdateRecipe(recipeData));
  }

  initializeForm() {
    super.initializeForm();

    this.recipeForm.get("name").setValue(this.recipe.name);
    this.recipeForm.get("imagePath").setValue(this.recipe.imagePath);
    this.recipeForm.get("description").setValue(this.recipe.description);
    if(this.recipe.ingredients) {
      this.recipe.ingredients.forEach((ingredient) => {
        (<FormArray>this.recipeForm.get("ingredients"))
        .push(super.createIngredientForm(ingredient.name, ingredient.amount));
      });
    }
  }
}
