// External dependencies
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Components
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from './shared/shared.module';
import { MaterialModule } from './shared/material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { LoginComponent } from './auth/login/login.component';
import { RecipeCardComponent } from './components/recipe-card/recipe-card.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UserTableComponent } from './components/user-table/user-table.component';
import { UserEditRoleComponent } from './components/user-edit-role/user-edit-role.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    RecipesListComponent,
    RecipeCardComponent,
    LoginComponent,
    UsersListComponent,
    UserTableComponent,
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    MaterialModule,
    UserEditRoleComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
