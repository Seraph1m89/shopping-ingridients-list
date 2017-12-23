import { NgModule } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";
import { SharedModule } from "../shared/shared.module";
import { AppRoutingModule } from "../app-routing.module";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { ShoppingListService } from "../shopping/shopping-list.service";
import { RecipeService } from "../recipes/recipe.service";
import { AuthenticationService } from "../auth/auth.service";
import { AuthGuard } from "../auth/auth-guard.service";
import { RecipeResolver } from "../recipes/recipe-resolver.service";

@NgModule({
    declarations: [
        HeaderComponent,
        HomeComponent,
        ErrorPageComponent
    ],
    imports: [
        SharedModule,
        AppRoutingModule
    ],
    exports: [
        AppRoutingModule,
        HeaderComponent,
        SharedModule
    ], 
    providers: [
        ShoppingListService, 
        RecipeService, 
        AuthenticationService, 
        AuthGuard, 
        RecipeResolver],
})
export class CoreModule {

}