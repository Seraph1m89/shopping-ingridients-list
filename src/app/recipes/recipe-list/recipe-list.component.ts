import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  private _subscription: Subscription;

  recipes: Recipe[] = [];

  constructor(private _recipeService: RecipeService, private _router: Router,
  private _activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this._recipeService.getRecipes().subscribe(
      (data) => this.recipes = data,
      (error) => console.log(error)
    );
    this._subscription = this._recipeService.recipesChanged
    .subscribe((subscription) => {
      subscription.subscribe(
        (data) => this.recipes = data,
        (error) => console.log(error)
      );
    });
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  onNewRecipe() {
    this._router.navigate(['new'], {relativeTo: this._activeRoute});
  }
}
