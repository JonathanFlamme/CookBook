import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { canActivateIsLogged } from '../public/auth.guard';
import { MyRecipesListComponent } from './my-recipes-list/my-recipes-list.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivateChild: [canActivateIsLogged],
    children: [
      {
        path: '',
        component: MyRecipesListComponent,
      },
      {
        path: '',
        redirectTo: 'my-recipes',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyRecipesRoutingModule {}
