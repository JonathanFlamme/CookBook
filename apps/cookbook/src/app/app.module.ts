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
import { CategoriesComponent } from './components/categories.component';
import { RecipeCreateComponent } from './components/recipe-create/recipe-create.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { RecipeViewComponent } from './recipe-view/recipe-view.component';
import { RecipeEditComponent } from './components/recipe-edit/recipe-edit.component';
import { IngredientDeleteConfirmComponent } from './components/ingredient-delete-confirm/ingredient-delete-confirm.component';
import { StepDeleteConfirmComponent } from './components/step-delete-confirm/step-delete-confirm.component';
import { RecipeCardComponent } from './components/recipe-card/recipe-card.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HttpInterceptor } from './shared/auth/http.interceptor';
import { MyRecipesListComponent } from './my-recipes-list/my-recipes-list.component';
import { UnitListComponent } from './components/unit-list.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { UserRoleComponent } from './components/user-role.component';
import { QuotaRecipeByMonthComponent } from './components/quota-recipe-by-month/quota-recipe-by-month.component';
import { BackButtonComponent } from './components/ui/back-button.component';
import { RecipeDeleteConfirmComponent } from './components/recipe-delete-confirm/recipe-delete-confirm.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    CategoriesComponent,
    RecipeCreateComponent,
    RecipesListComponent,
    RecipeViewComponent,
    RecipeEditComponent,
    IngredientDeleteConfirmComponent,
    StepDeleteConfirmComponent,
    RecipeCardComponent,
    LoginComponent,
    RegisterComponent,
    MyRecipesListComponent,
    UnitListComponent,
    ProfileViewComponent,
    UserRoleComponent,
    RecipeDeleteConfirmComponent,
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    MaterialModule,
    QuotaRecipeByMonthComponent,
    BackButtonComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
