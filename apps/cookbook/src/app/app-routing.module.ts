import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { RecipeCreateComponent } from './components/recipe-create/recipe-create.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { RecipeViewComponent } from './recipe-view/recipe-view.component';
import { RecipeEditComponent } from './components/recipe-edit/recipe-edit.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { MyRecipesListComponent } from './my-recipes-list/my-recipes-list.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';

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
        path: 'my-recipes',
        component: MyRecipesListComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'profile',
        component: ProfileViewComponent,
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
