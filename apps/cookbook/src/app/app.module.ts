// External dependencies
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { LayoutComponent } from './layout/layout.component';
import { SharedModule } from './shared/shared.module';
import { HttpInterceptor } from './shared/auth/http.interceptor';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ErrorsModule } from './errors/errors.module';
import { PublicModule } from './public/public.module';
import { FooterComponent } from './layout/footer/footer.component';

@NgModule({
  declarations: [AppComponent, LayoutComponent, FooterComponent],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    LandingPageComponent,
    PublicModule,
    ErrorsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
