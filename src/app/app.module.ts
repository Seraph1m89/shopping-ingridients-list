import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipes/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeComponent } from './recipes/recipes.component';
import { DropdownDirective } from './shared/dropdown.directive';

import { ShoppingListService } from './shopping/shopping-list.service';
import { ShoppingListComponent } from './shopping/shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping/shopping-list/shopping-edit/shopping-edit.component';
import { RecipeService } from './recipes/recipe.service';
import { AppRoutingModule } from './app-routing.module';
import { RecipeResolver } from './recipes/recipe-resolver.service';
import { SelectRecipeComponent } from './recipes/select-recipe/select-recipe.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { RecipeNewComponent } from './recipes/recipe-new/recipe-new.component';
import { HttpModule } from '@angular/http';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthenticationService } from './auth/auth.service';
import { AuthGuard } from './auth/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShoppingListComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    RecipeComponent,
    DropdownDirective,
    ShoppingEditComponent,
    SelectRecipeComponent,
    RecipeEditComponent,
    ErrorPageComponent,
    RecipeNewComponent,
    SignupComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [ShoppingListService, RecipeResolver, RecipeService, AuthenticationService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
