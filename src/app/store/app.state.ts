import { ShoppingListState, shoppingListReducer } from "../shopping/store/shopping-list.reducer";
import { AuthState, authReducer } from "../auth/store/auth.reducer";
import { ActionReducerMap } from "@ngrx/store/src/models";
import { RecipesState, recipeReducer } from "../recipes/store/recipe.reducer";

export interface AppState {
    shoppingList: ShoppingListState,
    authentication: AuthState,
    recipes: RecipesState
};

export const reducers: ActionReducerMap<AppState> = {
    shoppingList: shoppingListReducer,
    authentication: authReducer,
    recipes: recipeReducer
};