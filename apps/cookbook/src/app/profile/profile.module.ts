import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ProfileViewComponent, UserEditComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    ChangePasswordComponent,
  ],
})
export class ProfileModule {}
