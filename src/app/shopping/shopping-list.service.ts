import { Ingredient } from "../shared/ingridient";
import { Subject } from 'rxjs/Subject';

export class ShoppingListService {
    private _ingredients: Ingredient[] = [
        new Ingredient("Chicken breast", 120),
        new Ingredient("Tomatos", 2)
    ];

    // ingridientsChanged = new EventEmitter<Ingredient[]>();
    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();

    getIngredients(): Ingredient[] {
        return this._ingredients.slice();
    }

    getIngridient(index: number) {
        return this._ingredients[index];
    }

    addIngridient(ingredient: Ingredient) {
        this._ingredients.push(ingredient);
        // this.ingridientsChanged.emit(this._ingridients.slice());
        this.ingredientsChanged.next(this._ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]) {
        this._ingredients.push(...ingredients);
        // this.ingridientsChanged.emit(this._ingridients.slice());
        this.ingredientsChanged.next(this._ingredients.slice());
    }

    updateIngredient(index: number, ingredient: Ingredient) {
        this._ingredients[index] = ingredient;
        this.ingredientsChanged.next(this._ingredients.slice());
    }

    deleteIngridient(index: number) {
        this._ingredients.splice(index, 1);
        this.ingredientsChanged.next(this._ingredients.slice());
    }
}