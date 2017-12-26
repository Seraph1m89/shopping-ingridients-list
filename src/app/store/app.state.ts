import { ShoppingListState, shoppingListReducer } from "../shopping/store/shopping-list.reducer";
import { AuthState, authReducer } from "../auth/store/auth.reducer";
import { ActionReducerMap } from "@ngrx/store/src/models";

export interface AppState {
    shoppingList: ShoppingListState,
    authentication: AuthState
};

export const reducers: ActionReducerMap<AppState> = {
    shoppingList: shoppingListReducer,
    authentication: authReducer
};