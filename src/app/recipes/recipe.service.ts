import { EventEmitter, OnInit, Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingridient";
import { Subject } from "rxjs/Subject";
import * as uuid from "uuid/v4";
import { Response } from "@angular/http";
import "rxjs/Rx";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import { error } from "util";
import { AuthenticationService } from "../auth/auth.service";
import { Token } from "@angular/compiler";
import { HttpClient } from "@angular/common/http";
import { HttpParams } from "@angular/common/http";

@Injectable()
export class RecipeService {

    recipesChanged = new Subject<Observable<Recipe[]>>();

    constructor(private _http: HttpClient, private _authService: AuthenticationService) { }

    // recipeSelected = new EventEmitter<Recipe>();

    getRecipes() {
        return this._http.get("https://recipe-list-2caaa.firebaseio.com/data.json")
            .map((responceBody: Object) => {
                let recipes = [];
                Object.keys(responceBody).forEach(key => {
                    const recipe = new Recipe(key, responceBody[key]["name"],
                        responceBody[key]["description"],
                        responceBody[key]["imagePath"],
                        responceBody[key]["ingredients"])
                    recipes.push(recipe);
                });
                return recipes;
            }); 
    }

    getRecipe(id: string) {
        return this._http.get<Recipe>(`https://recipe-list-2caaa.firebaseio.com/data/${id}.json`)
            .map((recipe) => {
                if (!recipe) {
                    throw new Error("Data is empty");
                }
                return new Recipe(id,
                    recipe.name,
                    recipe.description,
                    recipe.imagePath,
                    recipe.ingredients)
            });
    }

    addRecipe(recipeData: Recipe): Observable<string> {
        return this._authService.getToken().flatMap((token: string) => this._http.post("https://recipe-list-2caaa.firebaseio.com/data.json", 
        recipeData)
            .map((data) => {
                this.recipesChanged.next(this.getRecipes());
                return <string>data["name"];
            }));
    }

    updateRecipe(id: string, recipeData: Recipe) {
        return this._authService.getToken().flatMap((token: string) => this._http
        .put(`https://recipe-list-2caaa.firebaseio.com/data/${id}.json`, 
        recipeData)
            .do(responceBody => this.recipesChanged.next(this.getRecipes())));
    }

    removeRecipe(id: string): Observable<any> {
        return this._authService.getToken().flatMap((token: string) => this._http.delete(`https://recipe-list-2caaa.firebaseio.com/data/${id}.json`)
            .do((responceBody) => {
                this.recipesChanged.next(this.getRecipes());
                return responceBody;
            }
            ));
    }
}