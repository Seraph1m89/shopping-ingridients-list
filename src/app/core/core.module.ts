import { NgModule } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";
import { SharedModule } from "../shared/shared.module";
import { AppRoutingModule } from "../app-routing.module";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { ShoppingListService } from "../shopping/shopping-list.service";
import { AuthGuard } from "../auth/auth-guard.service";
import { RecipeResolver } from "../recipes/recipe-resolver.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInteceptor } from "../shared/auth.interceptor";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
    declarations: [
        HeaderComponent,
        HomeComponent,
        ErrorPageComponent
    ],
    imports: [
        SharedModule,
        AppRoutingModule,
        BrowserAnimationsModule
    ],
    exports: [
        AppRoutingModule,
        HeaderComponent,
        SharedModule
    ],
    providers: [
        ShoppingListService,
        AuthGuard,
        RecipeResolver,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInteceptor, multi: true }]
})
export class CoreModule {

}