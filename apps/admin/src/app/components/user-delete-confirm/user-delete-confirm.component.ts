import { Component, Inject } from '@angular/core';
import { UserModel } from '@cookbook/models';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../shared/users/user.service';
import { SnackBarComponent } from '../../shared/ui/snack-bar/snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-delete-confirm',
  templateUrl: './user-delete-confirm.component.html',
  styleUrl: './user-delete-confirm.component.scss',
})
export class UserDeleteConfirmComponent {
  constructor(
    private dialogRef: MatDialogRef<UserDeleteConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public readonly data: { user: UserModel },
    private readonly userService: UserService,
    private readonly snackBar: MatSnackBar,
  ) {}

  public delete(): void {
    this.userService.delete(this.data.user.id).subscribe({
      next: () => {
        this.snackBar.openFromComponent(SnackBarComponent, {
          duration: 2000,
          data: { message: "L'utilisateur a bien été supprimé", success: true },
        });
        this.dialogRef.close(this.data.user.id);
      },
      error: () => {
        this.dialogRef.close();
      },
    });
  }
}
