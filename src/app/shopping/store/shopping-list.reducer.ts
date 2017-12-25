import { Action } from "@ngrx/store";
import { Ingredient } from "../../shared/ingridient";
import { ShoppingListActions } from "./shopping-list.actions";
import * as IngredientActionTypes from "./ingridient-actions.constants";

const initialState = {
    ingredients: [
        new Ingredient("Chicken breast", 120),
        new Ingredient("Tomatos", 2)
    ]
}

export interface AppState {
    shoppingList: ShoppingListState
}

export interface ShoppingListState {
    ingredients: Ingredient[]
}

export function shoppingListReducer(state = initialState, action: ShoppingListActions) {
    switch(action.type) {
        case IngredientActionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            }
        case IngredientActionTypes.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            }
        case IngredientActionTypes.UPDATE_INGREDIENT:
            const ingredientToChange = state.ingredients[action.payload.index];
            const updatedIngredient = {
                ...ingredientToChange,
                ...action.payload.ingredient
            }

            const ingredients = [
                ...state.ingredients
            ];
            ingredients[action.payload.index] = updatedIngredient;

            return {
                ...state,
                ingredients: ingredients
            }
        case IngredientActionTypes.DELETE_INGREDIENT: 
            let currentIngredients = [
                ...state.ingredients
            ]
            currentIngredients.splice(action.payload, 1);
            return {
                ...state, 
                ingredients: currentIngredients
            }

        default:
            return state;
    }
}