import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { RecipeViewComponent } from './recipe-view/recipe-view.component';
import { canActivateIsLogged } from '../public/auth.guard';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { RecipeCreateComponent } from './recipe-create/recipe-create.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivateChild: [canActivateIsLogged],
    children: [
      {
        path: 'create',
        component: RecipeCreateComponent,
      },
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
