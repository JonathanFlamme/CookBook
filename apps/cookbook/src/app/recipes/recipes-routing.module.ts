import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeViewComponent } from './recipe-view/recipe-view.component';
import { canActivateIsLogged } from '../public/auth.guard';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { RecipeCreateComponent } from './recipe-create/recipe-create.component';

const routes: Routes = [
  {
    path: 'create',
    component: RecipeCreateComponent,
    canActivate: [canActivateIsLogged],
  },
  {
    path: ':recipeId',
    component: RecipeViewComponent,
  },
  {
    path: ':recipeId/edit',
    component: RecipeEditComponent,
    canActivate: [canActivateIsLogged],
  },
  {
    path: '',
    component: RecipesListComponent,
  },
  {
    path: '',
    redirectTo: 'recipes',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipesRoutingModule {}
