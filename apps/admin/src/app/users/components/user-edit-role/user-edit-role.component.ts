import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { UserModel, UserRole } from '@cookbook/models';
import { UserService } from '../../../shared/users/user.service';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../../../shared/ui/snack-bar/snack-bar.component';

@Component({
  selector: 'app-user-edit-role',
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './user-edit-role.component.html',
  styleUrl: './user-edit-role.component.scss',
})
export class UserEditRoleComponent implements OnInit {
  public role = UserRole;
  public newRole: UserRole = this.data.user.role;

  constructor(
    @Inject(MAT_DIALOG_DATA) public readonly data: { user: UserModel },
    private readonly dialogRef: MatDialogRef<UserEditRoleComponent>,
    private readonly userService: UserService,
    private readonly snackBar: MatSnackBar,
  ) {}

  public ngOnInit() {
    this.newRole = this.data.user.role;
  }

  public save(newRole: UserRole) {
    this.userService.updateRole(this.data.user.id, newRole).subscribe({
      next: () => {
        this.snackBar.openFromComponent(SnackBarComponent, {
          duration: 2000,
          data: { message: 'Le role à été modifié', success: true },
        });
        this.dialogRef.close(newRole);
      },
      error: () => {
        this.dialogRef.close();
      },
    });
  }
}
