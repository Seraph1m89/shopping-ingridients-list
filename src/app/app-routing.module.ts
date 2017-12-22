import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { ShoppingListComponent } from './shopping/shopping-list/shopping-list.component';
import { RecipeComponent } from './recipes/recipes.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeResolver } from './recipes/recipe-resolver.service';
import { SelectRecipeComponent } from './recipes/select-recipe/select-recipe.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { RecipeNewComponent } from './recipes/recipe-new/recipe-new.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes', component: RecipeComponent, children: [
      { path: '', component: SelectRecipeComponent, pathMatch: 'full' },
      { path: 'new', component: RecipeNewComponent, canActivate: [AuthGuard]},
      { path: ':id', component: RecipeDetailComponent, resolve: { recipe: RecipeResolver } },
      { path: ':id/edit', component: RecipeEditComponent, resolve: { recipe: RecipeResolver }, canActivate: [AuthGuard] }
    ]
  },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'signup', component:SignupComponent },
  { path: 'login', component:LoginComponent },
  { path: 'page-not-found', component: ErrorPageComponent, data: { message: 'Page not found' } },
  { path: '**', redirectTo: 'page-not-found' }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
