// External dependencies
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { LayoutComponent } from './layout/layout.component';
import { MaterialModule } from './shared/material/material.module';
import { SharedModule } from './shared/shared.module';
import { HttpInterceptor } from './shared/auth/http.interceptor';
import { MyRecipesListComponent } from './my-recipes-list/my-recipes-list.component';
import { ProfileViewComponent } from './profile/profile-view/profile-view.component';
import { BackButtonComponent } from './shared/ui/back-button.component';
import { UploadImageComponent } from './shared/upload/upload-image/upload-image.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ChangePasswordComponent } from './profile/change-password/change-password.component';
import { UserEditComponent } from './profile/user-edit/user-edit.component';
import { ErrorsModule } from './errors/errors.module';
import { PublicModule } from './public/public.module';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    MyRecipesListComponent,
    ProfileViewComponent,
    UserEditComponent,
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    MaterialModule,
    BackButtonComponent,
    UploadImageComponent,
    LandingPageComponent,
    ChangePasswordComponent,
    PublicModule,
    ErrorsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
