// External dependencies
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// Components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [AppComponent,HomeComponent],
  imports: [AppRoutingModule, HttpClientModule, BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
