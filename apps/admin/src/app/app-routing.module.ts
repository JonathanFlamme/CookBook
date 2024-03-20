import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { LoginComponent } from './auth/login/login.component';
import { UsersListComponent } from './users-list/users-list.component';
import { RecipeViewComponent } from './recipe-view/recipe-view.component';
import { RecipeEditComponent } from './components/recipe-edit/recipe-edit.component';
import { canActivateIsAdmin } from './auth/auth.guard';
import { NotFoundComponent } from './errors/not-found.component';
import { UnauthorizedComponent } from './errors/unauthorized.component';

const routes: Routes = [
  {
    path: 'admin',
    component: LayoutComponent,
    children: [
      {
        canActivate: [canActivateIsAdmin],
        canActivateChild: [canActivateIsAdmin],
        path: 'recipes',
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
        ],
      },
      {
        canActivate: [canActivateIsAdmin],
        path: 'users',
        component: UsersListComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  },
  {
    path: '404',
    component: NotFoundComponent,
  },
  {
    path: '401',
    component: UnauthorizedComponent,
  },
  {
    path: '**',
    redirectTo: 'admin',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
