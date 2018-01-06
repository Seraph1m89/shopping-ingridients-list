import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Router, ActivatedRoute } from '@angular/router';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';
import { AppState } from '../../store/app.state';
import { Store } from '@ngrx/store';
import { FetchRecipes } from '../store/recipes.actions';
import { RecipesState } from '../store/recipe.reducer';
import { Observable } from 'rxjs/Observable';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
  animations: [
    trigger('recipeListItem', [
      transition("void => *", [
        style({
          opacity: 0,
          color: 'red',
          transform: "translateX(-100px)"
        }),
        animate(500)
      ]),
      transition("* => void", animate(500, style({
        opacity: 0,
        transform: "translateX(-100px)"
      })))
    ])
  ]
})
export class RecipeListComponent implements OnInit {
  recipesState: Observable<RecipesState>;

  constructor(private _router: Router,
  private _activeRoute: ActivatedRoute, private _store: Store<AppState>) { }

  ngOnInit() {
    this.recipesState = this._store.select("recipes");
  }

  onNewRecipe() {
    this._router.navigate(['new'], {relativeTo: this._activeRoute});
  }
}
