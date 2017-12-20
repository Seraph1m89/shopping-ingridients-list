import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { RecipeNewComponent } from '../recipe-new/recipe-new.component';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: '../recipe-new/recipe-new.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent extends RecipeNewComponent {

  recipe: Recipe;

  constructor(private _activeRoute: ActivatedRoute, recipeService: RecipeService, router: Router) {
    super(recipeService, router);
  }

  onSubmit() {
    this.updateRecipe(this.recipeForm.value)
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

  private updateRecipe(recipe: Recipe) {
    this._recipeService.updateRecipe(this.recipe.id, recipe).subscribe(
      responce => this.navigateToDetails(),
      error => console.log(error)
    );
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
