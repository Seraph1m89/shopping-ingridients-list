import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SignupComponent } from "./signup/signup.component";
import { LoginComponent } from "./login/login.component";

const authenticationRoutes: Routes = [
    { path: 'signup', component: SignupComponent },
    { path: 'login', component: LoginComponent },
]

@NgModule({
    imports: [RouterModule.forChild(authenticationRoutes)],
    exports: [RouterModule]
})
export class AuthenticationRoutingModule { }