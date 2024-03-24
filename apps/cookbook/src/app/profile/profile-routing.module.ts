import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivateIsLogged } from '../public/auth.guard';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes: Routes = [
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    canActivate: [canActivateIsLogged],
  },
  {
    path: '',
    component: ProfileViewComponent,
    canActivate: [canActivateIsLogged],
  },
  {
    path: '',
    redirectTo: 'profile',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
