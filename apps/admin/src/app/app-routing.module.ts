import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  {
    path: 'admin',
    component: LayoutComponent,
    children: [
      {
        path: 'recipes',
        component: RecipesListComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
