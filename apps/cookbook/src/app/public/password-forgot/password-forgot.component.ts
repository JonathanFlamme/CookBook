import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../shared/users/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../../shared/ui/snack-bar/snack-bar.component';

@Component({
  selector: 'app-password-forgot',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './password-forgot.component.html',
  styleUrl: './password-forgot.component.scss',
})
export class PasswordForgotComponent {
  constructor(
    private dialogRef: MatDialogRef<PasswordForgotComponent>,
    private readonly fb: FormBuilder,
    private readonly userService: UserService,
    private readonly snackbar: MatSnackBar,
  ) {}

  public forgotForm = this.fb.group({
    email: this.fb.control<string>('', Validators.required),
  });

  public passwordForgot(): void {
    const { email } = this.forgotForm.value;
    this.userService.forgotPassword(email!).subscribe({
      next: () => {
        this.snackbar.openFromComponent(SnackBarComponent, {
          duration: 2000,
          data: {
            message: 'Un e-mail vous a été envoyé',
            success: true,
          },
        });
        this.dialogRef.close();
      },
      error: () => {
        this.snackbar.openFromComponent(SnackBarComponent, {
          duration: 2000,
          data: {
            message:
              "L'adresse e-mail que vous avez saisie n'est associé à aucun compte",
            success: false,
          },
        });
        this.dialogRef.close();
      },
    });
  }
}
