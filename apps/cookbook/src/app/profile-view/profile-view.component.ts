import { Component, OnInit } from '@angular/core';
import { UserModel, UserRole } from '@cookbook/models';
import { UserService } from '../shared/users/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangePasswordComponent } from '../auth/change-password/change-password.component';
import { MatDialog } from '@angular/material/dialog';
import { SnackBarComponent } from '../components/ui/snack-bar/snack-bar.component';
import { UserEditComponent } from '../auth/user-edit/user-edit.component';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrl: './profile-view.component.scss',
})
export class ProfileViewComponent implements OnInit {
  public loading = true;
  public profile!: UserModel;

  public UserRole = UserRole;

  constructor(
    private readonly userService: UserService,
    private readonly snackbar: MatSnackBar,
    private readonly dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.userService.view().subscribe({
      next: (profile) => {
        this.profile = profile;
        this.loading = false;
      },
    });
  }

  public changePassword(): void {
    const dialogRef = this.dialog.open(ChangePasswordComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.snackbar.openFromComponent(SnackBarComponent, {
          duration: 2000,
          data: {
            message: 'Le mot de passe a bien été modifié',
            success: true,
          },
        });
      }
    });
  }
  public editProfile(): void {
    const dialogRef = this.dialog.open(UserEditComponent, {
      data: {
        user: this.profile,
      },
    });

    dialogRef.afterClosed().subscribe((profile: UserModel) => {
      if (profile) {
        this.profile = profile;
      }
    });
  }
}
