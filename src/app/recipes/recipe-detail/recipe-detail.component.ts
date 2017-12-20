import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ShoppingListService } from '../../shopping/shopping-list.service';
import { ActivatedRoute, Data, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  selectedRecipe: Recipe;

  constructor(private _shoppingListService: ShoppingListService, private _activeRoute: ActivatedRoute, private _router: Router, private _recipeService: RecipeService) { }

  ngOnInit() {
    this._activeRoute.data.subscribe(
      (data: Data) => {
        this.selectedRecipe = data['recipe'];
      }
    );
  }

  onAddToShoppingList() {
    this._shoppingListService.addIngredients(this.selectedRecipe.ingredients);
  }

  onEditRecipe() {
    this._router.navigate(['edit'], { relativeTo: this._activeRoute });
  }

  onDeleteRecipe() {
    this._recipeService.removeRecipe(this.selectedRecipe.id).subscribe();
    this._router.navigate(['../'], { relativeTo: this._activeRoute });
  }
}
