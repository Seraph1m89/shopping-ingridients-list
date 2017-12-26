import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { AuthenticationRoutingModule } from "./authentication-routng.module";
import { SharedModule } from "../shared/shared.module";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { StoreModule } from "@ngrx/store";
import { authReducer } from "./store/auth.reducer";

@NgModule({
    declarations: [
        SignupComponent,
        LoginComponent
    ],
    imports: [
        CommonModule,
        AuthenticationRoutingModule,
        FormsModule,
        StoreModule.forFeature("authentication", authReducer)       
    ]
})
export class AuthenticationModule {}