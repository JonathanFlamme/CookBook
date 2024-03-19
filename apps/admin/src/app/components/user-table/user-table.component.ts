import { Component, Input } from '@angular/core';
import { UserModel } from '@cookbook/models';

import { MatDialog } from '@angular/material/dialog';
import { UserEditRoleComponent } from '../user-edit-role/user-edit-role.component';
import { UserDeleteConfirmComponent } from '../user-delete-confirm/user-delete-confirm.component';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss',
})
export class UserTableComponent {
  @Input() public users: UserModel[] = [];

  constructor(private readonly dialog: MatDialog) {}

  public displayedColumns: string[] = ['name', 'email', 'role', 'actions'];

  public editRole(user: UserModel): void {
    const dialogRef = this.dialog.open(UserEditRoleComponent, {
      data: { user },
    });

    dialogRef.afterClosed().subscribe((role) => {
      if (role) {
        user.role = role;
      }
    });
  }

  public delete(user: UserModel): void {
    const dialogRef = this.dialog.open(UserDeleteConfirmComponent, {
      data: { user },
      width: 'auto',
    });

    dialogRef.afterClosed().subscribe((user) => {
      if (user) {
        this.users = this.users.filter((_user) => _user.id !== user);
      }
    });
  }
}
