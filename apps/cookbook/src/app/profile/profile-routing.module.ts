import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { canActivateIsLogged } from '../public/auth.guard';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivateChild: [canActivateIsLogged],
    children: [
      {
        path: 'change-password',
        component: ChangePasswordComponent,
      },
      {
        path: '',
        component: ProfileViewComponent,
      },
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
