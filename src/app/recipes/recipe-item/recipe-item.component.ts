import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipeItem: Recipe;

  constructor(private _recipeService: RecipeService, private _router: Router, private _activeRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  onSelectRecipe() {
    // this._recipeService.recipeSelected.emit(this.recipeItem);
    // this._router.navigate([this.recipeItem.id], {relativeTo: this._activeRoute});
  }
}
