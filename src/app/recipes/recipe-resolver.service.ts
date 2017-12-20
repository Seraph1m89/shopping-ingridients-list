import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Router } from "@angular/router";
import { RecipeService } from "./recipe.service";
import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Observable } from "rxjs/Observable";

@Injectable()
export class RecipeResolver implements Resolve<Recipe>{
    constructor(private _recipeService: RecipeService, private _router: Router){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe | Observable<Recipe> | Promise<Recipe> {
        return this._recipeService.getRecipe(<string>route.params['id'])
        .catch(error => {
            this._router.navigate(["/not-found"]);
            return Observable.of(error)});
    }
}