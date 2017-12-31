import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Observable } from "rxjs/Observable";
import { AppState } from "../store/app.state";
import { Store } from "@ngrx/store";
import { RecipesState } from "./store/recipe.reducer";

@Injectable()
export class RecipeResolver implements Resolve<Recipe>{
    constructor(private _router: Router, private _store: Store<AppState>) { }

    waitForDataToLoad(): Observable<RecipesState> {
        return this._store.select(state => state.recipes)
            .filter(recipesState => recipesState && recipesState.isInitialized);
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe | Observable<Recipe> | Promise<Recipe> {
        return this.waitForDataToLoad()
            .take(1)
            .map(state => {
                var foundRecipe = state.recipes.find(recipe => recipe.id === <string>route.params['id']);
                if (!foundRecipe) {
                    throw Observable.throw("No data was found");
                }

                return foundRecipe;
            })
            .catch(error => {
                this._router.navigate(["/not-found"]);
                return Observable.of(error)
            });
    }
}