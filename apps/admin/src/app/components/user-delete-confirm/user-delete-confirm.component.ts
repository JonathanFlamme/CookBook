import { Component, Inject } from '@angular/core';
import { UserModel } from '@cookbook/models';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../shared/users/user.service';

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
  ) {}

  public delete(): void {
    this.userService.delete(this.data.user.id).subscribe({
      next: () => {
        this.dialogRef.close(this.data.user.id);
      },
      error: (error: Error) => {
        this.dialogRef.close();
        console.error(error);
      },
    });
  }
}
