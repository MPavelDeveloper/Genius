import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DataProvider} from '../data-provider';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) {
  }

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let dataProvider = this.injector.get(DataProvider);
    let authorization = dataProvider.getToken();
    if (authorization) {
      return next.handle(httpRequest.clone({setHeaders: {authorization}}));
    } else {
      return next.handle(httpRequest);
    }
  }

}
