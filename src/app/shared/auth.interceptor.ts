import { HttpInterceptor, HttpHandler, HttpEvent, HttpParams } from "@angular/common/http";
import { HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { AuthenticationService } from "../auth/auth.service";

@Injectable()
export class AuthInteceptor implements HttpInterceptor {

    constructor(private _authService: AuthenticationService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(req.method === "GET") {
            return next.handle(req);
        }

        return this._authService.getToken()
            .flatMap(token => {
                const requestCopy = req.clone({params: req.params.set("auth", token)});
                return next.handle(requestCopy);
            });
    }
}