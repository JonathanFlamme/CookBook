import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { RecipeCreateComponent } from './components/recipe-create/recipe-create.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { RecipeViewComponent } from './recipe-view/recipe-view.component';
import { RecipeEditComponent } from './components/recipe-edit/recipe-edit.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'recipes',
        component: RecipesListComponent,
      },
      {
        path: 'recipes/create',
        component: RecipeCreateComponent,
      },
      {
        path: 'recipes/:recipeId',
        component: RecipeViewComponent,
      },
      {
        path: 'recipes/:recipeId/edit',
        component: RecipeEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
