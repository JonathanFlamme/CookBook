import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class HttpInterceptor implements HttpInterceptor {
  //!! Choice between cookie mode and token in header mode !!
  // ------- COOKIE MODE --------- //
  //   intercept(
  //     request: HttpRequest<unknown>,
  //     next: HttpHandler,
  //   ): Observable<HttpEvent<unknown>> {
  //     request = request.clone({
  //       withCredentials: true,
  //     });
  //     return next.handle(request);
  //   }
  // ------- END COOKIE MODE ------- //

  // -------- TOKEN IN HEADER ------- //
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    const authToken = localStorage.getItem('access_token');
    if (authToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`,
        },
      });
    }

    return next.handle(request);
  }
  // -------- TOKEN IN HEADER ------- //
}
