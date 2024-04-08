import { NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module';
import { FontAwesomeLibraryModule } from './material/font-awesome.module';
import { CommonModule } from '@angular/common';
import { UnitListComponent } from './ingredients/unit-list.component';
import { SnackBarComponent } from './ui/snack-bar/snack-bar.component';
import { BackButtonComponent } from './ui/back-button.component';
import { UploadImageComponent } from './upload/upload-image/upload-image.component';
import { CategoriesComponent } from './ui/categories.component';
import { UserRoleComponent } from './users/user-role.component';
import { RecipeCardComponent } from './recipes/recipe-card/recipe-card.component';
import { QuotaRecipeByMonthComponent } from './users/quota-recipe-by-month.component';
import { RecipesFilterBottomSheetComponent } from './recipes/recipes-filter-bottom-sheet/recipes-filter-bottom-sheet.component';

@NgModule({
  declarations: [
    UnitListComponent,
    CategoriesComponent,
    UserRoleComponent,
    RecipesFilterBottomSheetComponent,
  ],
  imports: [
    MaterialModule,
    FontAwesomeLibraryModule,
    CommonModule,
    SnackBarComponent,
    BackButtonComponent,
    UploadImageComponent,
    QuotaRecipeByMonthComponent,
    RecipeCardComponent,
  ],
  exports: [
    MaterialModule,
    FontAwesomeLibraryModule,
    CommonModule,
    UnitListComponent,
    SnackBarComponent,
    BackButtonComponent,
    UploadImageComponent,
    CategoriesComponent,
    UserRoleComponent,
    QuotaRecipeByMonthComponent,
    RecipeCardComponent,
    RecipesFilterBottomSheetComponent,
  ],
  providers: [],
})
export class SharedModule {}
