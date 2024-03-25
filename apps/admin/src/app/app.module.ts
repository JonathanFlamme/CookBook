// External dependencies
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Components
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from './shared/shared.module';
import { MaterialModule } from './shared/material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './auth/login/login.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UserEditRoleComponent } from './components/user-edit-role/user-edit-role.component';
import { UserDeleteConfirmComponent } from './components/user-delete-confirm/user-delete-confirm.component';
import { NotFoundComponent } from './errors/not-found.component';
import { UnauthorizedComponent } from './errors/unauthorized.component';
import { HttpErrorInterceptor } from './errors/http.error.interceptor';
import { HttpInterceptor } from './auth/http.interceptor';
import { UserTableComponent } from './components/user-table/user-table.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    LoginComponent,
    UsersListComponent,
    UserTableComponent,
    UserDeleteConfirmComponent,
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    MaterialModule,
    UserEditRoleComponent,
    NotFoundComponent,
    UnauthorizedComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
