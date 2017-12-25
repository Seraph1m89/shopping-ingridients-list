import { Ingredient } from "../shared/ingridient";
import { Subject } from 'rxjs/Subject';
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import * as ShoppingListActions from "./store/shopping-list.actions";
import * as IngredientActionType from "./store/ingridient-actions.constants";
import { Observable } from "rxjs/Observable";
import { ShoppingListState, AppState } from "./store/shopping-list.reducer";

@Injectable()
export class ShoppingListService {
    private _ingredients: Ingredient[] = [
        new Ingredient("Chicken breast", 120),
        new Ingredient("Tomatos", 2)
    ];

    private _ingredientState: Observable<{ingredients: Ingredient[]}>;

    constructor(private _store: Store<AppState>) {
        this._ingredientState = this._store.select("shoppingList");
    }

    startedEditing = new Subject<number>();

    getIngredients(): Observable<ShoppingListState> {
        return this._store.select("shoppingList");
    }

    getIngridient(index: number) {
        return this._ingredientState.map(ingredientsState => ingredientsState.ingredients[index]);
    }

    addIngridient(ingredient: Ingredient) {
        this._store.dispatch(new ShoppingListActions.AddIngredient(ingredient));
    }

    addIngredients(ingredients: Ingredient[]) {
        this._store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
    }

    updateIngredient(index: number, ingredient: Ingredient) {
        this._store.dispatch(
            new ShoppingListActions.UpdateIngredient({index, ingredient}));
    }

    deleteIngridient(index: number) {
        this._store.dispatch(new ShoppingListActions.DeleteIngredient(index));
    }
}