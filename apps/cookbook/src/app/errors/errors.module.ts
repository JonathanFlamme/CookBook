import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { HttpErrorInterceptor } from './http.error.interceptor';
import { CommonModule } from '@angular/common';
import { ErrorsRoutingModule } from './errors-routing.module';
import { UnauthorizedComponent } from './unauthorized.component';
import { NotFoundComponent } from './not-found.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ErrorsRoutingModule,
    UnauthorizedComponent,
    NotFoundComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
  ],
})
export class ErrorsModule {}
