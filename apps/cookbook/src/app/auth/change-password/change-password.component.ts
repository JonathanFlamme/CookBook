import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { matchPassword } from '../register/match-password.validator';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserModel } from '@cookbook/models';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../shared/users/user.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, MatInputModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent {
  constructor(
    private dialogRef: MatDialogRef<ChangePasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public readonly data: { profile: UserModel },
    private readonly fb: FormBuilder,
    private readonly userService: UserService,
  ) {}

  public changePasswordForm = this.fb.group(
    {
      currentPassword: this.fb.control<string>('', Validators.required),
      password: this.fb.control<string>('', Validators.required),
      confirmPassword: this.fb.control<string>('', Validators.required),
    },
    { validators: matchPassword },
  );

  public changePassword(): void {
    const { currentPassword, password } = this.changePasswordForm.value;

    this.userService.changePassword(currentPassword!, password!).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: () => {
        this.dialogRef.close();
      },
    });
  }
}
