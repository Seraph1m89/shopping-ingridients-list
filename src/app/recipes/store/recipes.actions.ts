import * as RecipeAction from "./recipe.constants";
import { Action } from "@ngrx/store";
import { Recipe } from "../recipe.model";

export class UpdateRecipe implements Action {
    readonly type = RecipeAction.UPDATE_RECIPE;
    constructor(public payload: Recipe) {}
}

export class TryUpdateRecipe implements Action {
    readonly type = RecipeAction.TRY_UPDATE_RECIPE;
    constructor(public payload: Recipe) {}
}

export class DeleteRecipe implements Action {
    readonly type = RecipeAction.DELETE_RECIPE;
    constructor(public payload: string) {}
}

export class TryDeleteRecipe implements Action {
    readonly type = RecipeAction.TRY_DELETE_RECIPE;
    constructor(public payload: string) {}
}

export class AddRecipe implements Action {
    readonly type = RecipeAction.ADD_RECIPE;
    constructor(public payload: Recipe) {}
}

export class TryAddRecipe implements Action {
    readonly type = RecipeAction.TRY_ADD_RECIPE;
    constructor(public payload: Recipe) {}
}

export class FetchRecipes implements Action {
    readonly type = RecipeAction.FETCH_RECIPES;
}

export class SetRecipes implements Action {
    readonly type = RecipeAction.SET_RECIPES;
    constructor(public payload: Recipe[]) {}
}

export type RecipeActions = AddRecipe | TryAddRecipe | DeleteRecipe | TryDeleteRecipe | UpdateRecipe | TryUpdateRecipe | FetchRecipes | SetRecipes