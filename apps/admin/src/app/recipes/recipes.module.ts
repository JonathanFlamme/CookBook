import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipesRoutingModule } from './recipes-routing.module';
import { IngredientDeleteConfirmComponent } from './components/ingredient-delete-confirm/ingredient-delete-confirm.component';
import { RecipeCardComponent } from './components/recipe-card/recipe-card.component';
import { RecipeDeleteConfirmComponent } from './components/recipe-delete-confirm/recipe-delete-confirm.component';
import { RecipeEditComponent } from './components/recipe-edit/recipe-edit.component';
import { StepDeleteConfirmComponent } from './components/step-delete-confirm/step-delete-confirm.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { RecipeViewComponent } from './recipe-view/recipe-view.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    IngredientDeleteConfirmComponent,
    RecipeCardComponent,
    RecipeDeleteConfirmComponent,
    RecipeEditComponent,
    StepDeleteConfirmComponent,
    RecipesListComponent,
    RecipeViewComponent,
  ],
  imports: [CommonModule, RecipesRoutingModule, SharedModule],
})
export class RecipesModule {}
