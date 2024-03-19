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
import { canActivateIsLogged } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'recipes',
        children: [
          {
            path: ':recipeId',
            component: RecipeViewComponent,
          },
          {
            canActivate: [canActivateIsLogged],
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
      {
        canActivate: [canActivateIsLogged],
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
        canActivate: [canActivateIsLogged],
        path: 'profile',
        component: ProfileViewComponent,
      },
      {
        canActivate: [canActivateIsLogged],
        path: 'recipe/create',
        component: RecipeCreateComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
