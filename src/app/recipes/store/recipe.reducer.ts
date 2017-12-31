import { RecipeActions } from "./recipes.actions";
import * as RecipeAction from "./recipe.constants";
import { Recipe } from "../recipe.model";

export interface RecipesState {
    recipes: Recipe[],
    isInitialized: boolean
}

const initialState: RecipesState = {
    recipes: [],
    isInitialized: false
}

export function recipeReducer(state = initialState, action: RecipeActions) {
    switch (action.type) {
        case RecipeAction.SET_RECIPES:
            return {
                ...state,
                recipes: action.payload,
                isInitialized: true
            }
        case RecipeAction.DELETE_RECIPE:
            let deletedIndex = state.recipes.findIndex(recipe => recipe.id === action.payload);
            var copiedArray = [...state.recipes];
            if (deletedIndex >= 0) {
                copiedArray.splice(deletedIndex);
            }
            return {
                ...state,
                recipes: copiedArray
            }
        case RecipeAction.ADD_RECIPE:
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            }
        case RecipeAction.UPDATE_RECIPE:
            var updatedIndex = state.recipes.findIndex(recipe => recipe.id === action.payload.id);
            var copiedArray = [...state.recipes];
            if(updatedIndex >= 0) {
                copiedArray[updatedIndex] = action.payload;
            }
            return {
                ...state,
                recipes: copiedArray
            }
        default:
            return {
                ...state
            }
    }
}