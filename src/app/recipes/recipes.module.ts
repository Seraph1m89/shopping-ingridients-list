import { NgModule } from "@angular/core";
import { RecipeComponent } from "./recipes.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeItemComponent } from "./recipe-item/recipe-item.component";
import { SelectRecipeComponent } from "./select-recipe/select-recipe.component";
import { ReactiveFormsModule } from "@angular/forms";
import { RecipeResolver } from "./recipe-resolver.service";
import { RecipeNewComponent } from "./recipe-new/recipe-new.component";
import { CommonModule } from "@angular/common";
import { RecipesRoutingModule } from "./recipes-routing.module";
import { SharedModule } from "../shared/shared.module";
import { StoreModule } from "@ngrx/store";
import { recipeReducer } from "./store/recipe.reducer";
import { EffectsModule } from "@ngrx/effects";
import { RecipeEffects } from "./store/recipe.effects";

@NgModule({
    declarations: [
        RecipeListComponent,
        RecipeItemComponent,
        RecipeDetailComponent,
        RecipeComponent,
        SelectRecipeComponent,
        RecipeEditComponent,
        RecipeNewComponent
    ],
    imports: [
        StoreModule.forFeature("recipes", recipeReducer),        
        ReactiveFormsModule,
        RecipesRoutingModule,
        SharedModule,
        EffectsModule.forFeature([RecipeEffects])
    ]
})
export class RecipesModule {

}