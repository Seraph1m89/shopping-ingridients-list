import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { RecipeService } from "./recipe.service";
import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Observable } from "rxjs/Observable";

@Injectable()
export class RecipeResolver implements Resolve<Recipe>{
    constructor(private _recipeService: RecipeService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe | Observable<Recipe> | Promise<Recipe> {
        return this._recipeService.getRecipe(+route.params['id']);
        // return this._recipeService.getRecipes();
    }
}