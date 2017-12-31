import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from '../../shopping/shopping-list.service';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { AppState } from '../../store/app.state';
import { Store } from '@ngrx/store';
import { TryDeleteRecipe } from '../store/recipes.actions';
import { Observable } from 'rxjs/Observable';
import { RecipesState } from '../store/recipe.reducer';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipesState: Observable<RecipesState>;
  routeId: string;
  selectedRecipe: Recipe;

  constructor(private _shoppingListService: ShoppingListService, private _activeRoute: ActivatedRoute, private _router: Router, private _store: Store<AppState>) { }

  ngOnInit() {
    this.recipesState = this._store.select("recipes");
    this._activeRoute.params.subscribe(
      params => { var id = <string>params["id"];
       this.recipesState.take(1).subscribe
       (state => this.selectedRecipe = state.recipes.find(recipe => recipe.id === id));
    }

    )
    // this._activeRoute.data.subscribe(
    //   (data: Data) => {
    //     this.selectedRecipe = data['recipe'];
    //   }
    // );
  }

  onAddToShoppingList() {
    this._shoppingListService.addIngredients(this.selectedRecipe.ingredients);
  }

  onEditRecipe() {
    this._router.navigate(['edit'], { relativeTo: this._activeRoute });
  }

  onDeleteRecipe() {
    this._store.dispatch(new TryDeleteRecipe(this.selectedRecipe.id));
    this._router.navigate(['../'], { relativeTo: this._activeRoute });
  }
}
