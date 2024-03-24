import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipeCreateComponent } from './recipe-create/recipe-create.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { RecipeViewComponent } from './recipe-view/recipe-view.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { IngredientDeleteConfirmComponent } from './components/ingredient-delete-confirm/ingredient-delete-confirm.component';
import { StepDeleteConfirmComponent } from './components/step-delete-confirm/step-delete-confirm.component';
import { RecipeDeleteConfirmComponent } from './components/recipe-delete-confirm/recipe-delete-confirm.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    RecipeCreateComponent,
    RecipesListComponent,
    RecipeViewComponent,
    RecipeEditComponent,
    IngredientDeleteConfirmComponent,
    StepDeleteConfirmComponent,
    RecipeDeleteConfirmComponent,
  ],
  imports: [CommonModule, RecipesRoutingModule, SharedModule],
})
export class RecipesModule {}
