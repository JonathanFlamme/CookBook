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
import { NotFoundComponent } from './errors/not-found.component';
import { UnauthorizedComponent } from './errors/unauthorized.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { VerificationEmailComponent } from './auth/verification-email/verification-email.component';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
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
        canActivateChild: [canActivateIsLogged],
        path: 'profile',
        children: [
          {
            path: '',
            component: ProfileViewComponent,
          },
          {
            path: 'change-password',
            component: ChangePasswordComponent,
          },
        ],
      },
      {
        canActivate: [canActivateIsLogged],
        path: 'recipe/create',
        component: RecipeCreateComponent,
      },
      {
        path: 'home',
        component: LandingPageComponent,
      },
      {
        path: 'verify/:token',
        component: VerificationEmailComponent,
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
    redirectTo: '404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
