import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UsersListComponent } from './users-list/users-list.component';
import { UserTableComponent } from './components/user-table/user-table.component';
import { UserDeleteConfirmComponent } from './components/user-delete-confirm/user-delete-confirm.component';
import { UserEditRoleComponent } from './components/user-edit-role/user-edit-role.component';

@NgModule({
  declarations: [
    UsersListComponent,
    UserTableComponent,
    UserDeleteConfirmComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    UserEditRoleComponent,
  ],
})
export class UsersModule {}
