import { HTTP_INTERCEPTORS, HttpEvent } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

import { StorageService } from '../services/storage.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  storageService = inject(StorageService);
  private TOKEN_HEADER_KEY = 'Authorization';

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.storageService.getToken();
    if (!!token) {
      req = req.clone({
        headers: req.headers.set(this.TOKEN_HEADER_KEY, 'Bearer ' + token),
      });
    }
    return next.handle(req);
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];
