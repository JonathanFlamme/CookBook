import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SnackBarComponent } from '../shared/ui/snack-bar/snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private readonly router: Router,
    private readonly snackBar: MatSnackBar,
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 400) {
          this.router.navigate(['404']);
        }

        if (error.status === 401) {
          this.router.navigate(['401']);
        }

        if (error.status === 404) {
          this.router.navigate(['404']);
        }

        if (error.status >= 500) {
          this.snackBar.openFromComponent(SnackBarComponent, {
            duration: 2000,
            data: { message: "Une erreur s'est produite", success: false },
          });
        }
        return throwError(() => error);
      }),
    );
  }
}
