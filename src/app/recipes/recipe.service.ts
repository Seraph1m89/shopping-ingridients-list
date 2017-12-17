import { EventEmitter, OnInit } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingridient";
import { Subject } from "rxjs/Subject";

export class RecipeService {

    recipesChanged = new Subject<Recipe[]>();

    private _recipes: Recipe[] = [
        new Recipe(1, 
            "Pancakes",
            "Yummi",
            "https://images.unsplash.com/photo-1478369402113-1fd53f17e8b4?auto=format&fit=crop&w=600&q=60&",
            [
                new Ingredient("Flour", 2),
                new Ingredient("Sugar", 1)
            ]),
        new Recipe(2,
            "Burger", "Twice as Yummi", "https://images.unsplash.com/photo-1504185945330-7a3ca1380535?auto=format&amp;fit=crop&amp;w=321&amp;q=80",
            [
                new Ingredient("Bread", 2),
                new Ingredient("Meat", 1)
            ])
    ];

    // recipeSelected = new EventEmitter<Recipe>();

    getRecipes() {
        return this._recipes.slice();
    }

    getRecipe(id: number) {
        return this._recipes.find(recipe => recipe.id === id);
    }

    addRecipe(recipeData: Recipe): Recipe {
        const newRecipe = new Recipe(this._recipes.length + 1, recipeData.name, 
            recipeData.description, recipeData.imagePath, recipeData.ingredients)
        this._recipes.push(newRecipe);
        this.recipesChanged.next(this.getRecipes());
        this.updateIDs();        
        return newRecipe;     
    }

    updateRecipe(id: number, recipeData: Recipe) {
        const newRecipe = new Recipe(id, recipeData.name, recipeData.description, recipeData.imagePath, recipeData.ingredients);
        this._recipes[id - 1] = newRecipe;
        this.updateIDs();        
        this.recipesChanged.next(this.getRecipes());
    }

    removeRecipe(id: number) {
        var recipeIndexToDelete = this._recipes.findIndex((recipe) => {
            return recipe.id === id;
        });
        if(recipeIndexToDelete !== -1) {
            this._recipes.splice(recipeIndexToDelete, 1);
        }
        this.updateIDs();
        this.recipesChanged.next(this._recipes);
    }

    private updateIDs() {
        for(var i = 0; i < this._recipes.length;) {
            this._recipes[i].id = ++i;
        }
    }
}