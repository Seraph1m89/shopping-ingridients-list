import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RecipeComponent } from "./recipes.component";
import { SelectRecipeComponent } from "./select-recipe/select-recipe.component";
import { RecipeNewComponent } from "./recipe-new/recipe-new.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeResolver } from "./recipe-resolver.service";
import { AuthGuard } from "../auth/auth-guard.service";

const recipesRoutes: Routes = [
    {
        path: '', component: RecipeComponent, children: [
            { path: '', component: SelectRecipeComponent, pathMatch: 'full' },
            { path: 'new', component: RecipeNewComponent, canActivate: [AuthGuard] },
            { path: ':id', component: RecipeDetailComponent, resolve: { recipe: RecipeResolver } },
            { path: ':id/edit', component: RecipeEditComponent, resolve: { recipe: RecipeResolver }, canActivate: [AuthGuard] }
        ]
    }];

@NgModule({
    imports: [
        RouterModule.forChild(recipesRoutes)
    ],
    exports: [RouterModule]
})
export class RecipesRoutingModule {

}