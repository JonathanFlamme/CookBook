import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeViewComponent } from './recipe-view/recipe-view.component';
import { RecipeEditComponent } from './components/recipe-edit/recipe-edit.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { canActivateIsAdmin } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [canActivateIsAdmin],
    children: [
      {
        path: ':recipeId',
        component: RecipeViewComponent,
      },
      {
        path: ':recipeId/edit',
        component: RecipeEditComponent,
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipesRoutingModule {}
