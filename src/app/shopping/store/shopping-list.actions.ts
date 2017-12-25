import { Action } from "@ngrx/store";
import { Ingredient } from "../../shared/ingridient";
import * as  IngredientActionTypes from "./ingridient-actions.constants";

export class AddIngredient implements Action {
    readonly type = IngredientActionTypes.ADD_INGREDIENT;
    constructor(public payload: Ingredient) {}
}

export class AddIngredients implements Action {
    readonly type = IngredientActionTypes.ADD_INGREDIENTS;
    constructor(public payload: Ingredient[]) {}
}

export class UpdateIngredient implements Action {
    readonly type = IngredientActionTypes.UPDATE_INGREDIENT;
    constructor(public payload: {index: number, ingredient: Ingredient}) {}
}

export class DeleteIngredient implements Action {
    readonly type = IngredientActionTypes.DELETE_INGREDIENT;
    constructor(public payload: number) {}
}

export type ShoppingListActions = AddIngredient | AddIngredients | UpdateIngredient | DeleteIngredient;