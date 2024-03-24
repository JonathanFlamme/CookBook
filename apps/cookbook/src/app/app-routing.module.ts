import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { canActivateIsLogged } from './public/auth.guard';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { MyRecipesListComponent } from './my-recipes-list/my-recipes-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'recipes',
    loadChildren: () =>
      import('./recipes/recipes.module').then((m) => m.RecipesModule),
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
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
        path: 'home',
        component: LandingPageComponent,
      },
      {
        path: 'my-recipes',
        canActivate: [canActivateIsLogged],
        component: MyRecipesListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
