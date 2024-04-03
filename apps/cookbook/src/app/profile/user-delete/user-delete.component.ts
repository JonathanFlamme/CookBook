import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { UserModel } from '@cookbook/models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../shared/users/user.service';
import { SnackBarComponent } from '../../shared/ui/snack-bar/snack-bar.component';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../shared/auth/auth.service';

@Component({
  selector: 'app-user-delete',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  templateUrl: './user-delete.component.html',
  styleUrl: './user-delete.component.scss',
})
export class UserDeleteComponent {
  constructor(
    private dialogRef: MatDialogRef<UserDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public readonly data: { user: UserModel },
    private readonly userService: UserService,
    private readonly snackBar: MatSnackBar,
    private readonly authService: AuthService,
  ) {}

  public delete(): void {
    this.userService.delete(this.data.user.id).subscribe({
      next: () => {
        this.snackBar.openFromComponent(SnackBarComponent, {
          duration: 2000,
          data: { message: 'Votre compté a bien été supprimé', success: true },
        });
        this.authService.logout();
      },
      error: () => {
        this.dialogRef.close();
      },
    });
  }
}
