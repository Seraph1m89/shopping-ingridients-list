import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { FormInitizable } from '../Interfaces/form-initializer.interface';
import { Recipe } from '../recipe.model';
import { Submittable } from '../Interfaces/submittable.interface';

@Component({
  selector: 'app-recipe-new',
  templateUrl: './recipe-new.component.html',
  styleUrls: ['./recipe-new.component.css']
})
export class RecipeNewComponent implements OnInit, FormInitizable, Submittable {

  recipeForm: FormGroup;  

  constructor(protected _recipeService: RecipeService, protected _router: Router) { }

  ngOnInit() {
    this.initializeForm();
  }

  onSubmit() {
    var recipe = this.addRecipe(this.recipeForm.value);
    this.navigateToDetails(recipe.id);
  }

  initializeForm() {
    this.recipeForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'imagePath': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'ingredients': new FormArray([])
    });
  }

  navigateToDetails(id: number) {
    this._router.navigate(['/recipes', id]);
  }

  onAddIngridient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, Validators.required)
      }));
  }

  private addRecipe(recipe: Recipe): Recipe {
    return this._recipeService.addRecipe(recipe);
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onCancel() {
    this._router.navigate(["/"]);
  }
}
