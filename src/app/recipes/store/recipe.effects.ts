import { Actions, Effect } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import * as RecipeAction from "./recipe.constants";
import { AddRecipe, UpdateRecipe, DeleteRecipe, FetchRecipes } from "./recipes.actions";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Router } from "@angular/router";
import { AppState } from "../../store/app.state";
import { Store, INIT } from "@ngrx/store";
import { Recipe } from "../recipe.model";

@Injectable()
export class RecipeEffects {

    constructor(private _actions$: Actions, private _http: HttpClient, private _router: Router, private _store: Store<AppState>) { }

    @Effect()
    recipeFetch = this._actions$
        .ofType(RecipeAction.FETCH_RECIPES)
        .switchMap(() => this._http.get("https://recipe-list-2caaa.firebaseio.com/data.json"))
        .map((responceBody: Object) => {
            let recipes = [];
            Object.keys(responceBody).forEach(key => {
                const recipe = new Recipe(key, responceBody[key]["name"],
                    responceBody[key]["description"],
                    responceBody[key]["imagePath"],
                    responceBody[key]["ingredients"])
                recipes.push(recipe);
            });
            return {
                type: RecipeAction.SET_RECIPES,
                payload: recipes
            };
        })

    @Effect()
    recipeAdd = this._actions$
        .ofType(RecipeAction.TRY_ADD_RECIPE)
        .take(1)
        .map((action: AddRecipe) => action.payload)
        .switchMap(recipe => {
            var recipeObservable = Observable.of(recipe);
            var requestObservable = this._http.post("https://recipe-list-2caaa.firebaseio.com/data.json",
                recipe)
            return Observable.zip(recipeObservable, requestObservable)
        })
        .map(merged => {
            var id = merged[1]["name"];
            var recipe = merged[0];
            recipe.id = id;
            return {
                type: RecipeAction.ADD_RECIPE,
                payload: recipe
            }
        })
        .do(state => this.navigateToDetails(state.payload.id));

    @Effect()
    recipeUpdate = this._actions$
        .ofType(RecipeAction.TRY_UPDATE_RECIPE)
        .map((action: UpdateRecipe) => action.payload)
        .do(recipe => {
            var copiedRecipe = {...recipe};
            delete copiedRecipe.id;
            return this._http
            .put(`https://recipe-list-2caaa.firebaseio.com/data/${recipe.id}.json`,
            copiedRecipe).subscribe()})
        .map(recipe => {
            return {
                type: RecipeAction.UPDATE_RECIPE,
                payload: recipe
            }
        })
        .do(state => this.navigateToDetails(state.payload.id));

    @Effect()
    recipeDelete = this._actions$
        .ofType(RecipeAction.TRY_DELETE_RECIPE)
        .map((action: DeleteRecipe) => action.payload)
        .do(id => this._http.delete(`https://recipe-list-2caaa.firebaseio.com/data/${id}.json`).subscribe())
        .map(id => {
            return {
                type: RecipeAction.DELETE_RECIPE,
                payload: id
            }
        });

    @Effect({dispatch: false}) 
    init$ = Observable.defer(() => {
        this._store.dispatch(new FetchRecipes());
    });

    private navigateToDetails(id) {
        this._router.navigate(['/recipes', id]);
    }
}