import { EventEmitter, OnInit, Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingridient";
import { Subject } from "rxjs/Subject";
import * as uuid from "uuid/v4";
import { Http, Response } from "@angular/http";
import "rxjs/Rx";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";

@Injectable()
export class RecipeService {

    recipesChanged = new Subject<Observable<Recipe[]>>();

    constructor(private _http: Http) {}

    // recipeSelected = new EventEmitter<Recipe>();

    getRecipes() {
        return this._http.get("https://recipe-list-2caaa.firebaseio.com/data.json")
        .map((responce: Response) => {
            let recipes = [];
            const data = responce.json();
            Object.keys(data).forEach(key => {
                const recipe = new Recipe(key, data[key]["name"], 
                data[key]["description"], 
                data[key]["imagePath"], 
                data[key]["ingredients"])
                recipes.push(recipe);
            }); 
            return recipes;
        });
    }

    getRecipe(id: string) {
        return this._http.get(`https://recipe-list-2caaa.firebaseio.com/data/${id}.json`)
        .map((response:Response) => {
            const data = response.json()
            return new Recipe(id, 
                data["name"],
                data["description"], 
                data["imagePath"], 
                data["ingredients"])
        });
    }

    addRecipe(recipeData: Recipe): Observable<string> {
        return this._http.post("https://recipe-list-2caaa.firebaseio.com/data.json", recipeData)
        .map((response: Response) => {
            const data = response.json();
            this.recipesChanged.next(this.getRecipes());
            return <string>data["name"];
        });
    }

    updateRecipe(id: string, recipeData: Recipe) {
        return this._http.put(`https://recipe-list-2caaa.firebaseio.com/data/${id}.json`, recipeData)
        .map(responce => this.recipesChanged.next(this.getRecipes()));
    }

    removeRecipe(id: string): Observable<Response> {
        return this._http.delete(`https://recipe-list-2caaa.firebaseio.com/data/${id}.json`)
            .map((responce: Response) => {
                this.recipesChanged.next(this.getRecipes());
                return responce;
            }
            );
    }
}