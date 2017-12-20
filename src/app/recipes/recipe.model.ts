import { Ingredient } from "../shared/ingridient";

export class Recipe {
    public ingredients: Ingredient[];
    public name: string;
    public description: string;
    public imagePath: string;
    public id: string;

    constructor(id: string, name: string, description: string, imagePath: string, ingredients: Ingredient[]) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.imagePath = imagePath;
        this.ingredients = ingredients;
    }
}