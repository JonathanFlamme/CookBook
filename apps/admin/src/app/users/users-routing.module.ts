import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivateIsAdmin } from '../auth/auth.guard';
import { UsersListComponent } from './users-list/users-list.component';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [canActivateIsAdmin],
    children: [
      {
        path: '',
        component: UsersListComponent,
      },
      {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
