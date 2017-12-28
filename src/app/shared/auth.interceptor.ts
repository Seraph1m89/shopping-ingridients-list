import { HttpInterceptor, HttpHandler, HttpEvent, HttpParams } from "@angular/common/http";
import { HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { AppState } from "../store/app.state";
import { Store } from "@ngrx/store";

@Injectable()
export class AuthInteceptor implements HttpInterceptor {

    constructor(private _store: Store<AppState>) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.method === "GET") {
            return next.handle(req);
        }

        return this._store.select("authentication")
            .take(1)
            .map(state => state.token)
            .switchMap(token => {
                const requestCopy = req.clone({ params: req.params.set("auth", token) });
                return next.handle(requestCopy);
            });
    }
}