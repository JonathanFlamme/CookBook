import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { canActivateIsLogged } from './public/auth.guard';
import { LandingPageComponent } from './landing-page/landing-page.component';
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
    path: 'profile',
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
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
