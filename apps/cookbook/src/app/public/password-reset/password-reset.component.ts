import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../shared/users/user.service';
import { mergeMap } from 'rxjs';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { matchPassword } from '../register/match-password.validator';
import { MatInputModule } from '@angular/material/input';
import { SnackBarComponent } from '../../components/ui/snack-bar/snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-password-reset',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.scss',
})
export class PasswordResetComponent implements OnInit {
  public state: 'loading' | 'error' | 'invalid' | 'done' = 'loading';
  public errorMessage: string = 'error';

  public token: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
  ) {}

  public resetPasswordForm = this.fb.group(
    {
      password: this.fb.control<string>('', Validators.required),
      confirmPassword: this.fb.control<string>('', Validators.required),
    },
    { validators: matchPassword },
  );

  public ngOnInit() {
    this.route.params
      .pipe(
        mergeMap(({ token }) => {
          this.token = token;
          return this.userService.verifyResetToken(token);
        }),
      )
      .subscribe({
        next: () => {
          this.state = 'done';
        },
        error: (error) => {
          this.state = error.status === 400 ? 'invalid' : 'error';
          console.log(error);
          this.errorMessage = error.error.message;
        },
      });
  }

  public changePassword(): void {
    const { password } = this.resetPasswordForm.value;

    this.userService.changePasswordWithToken(this.token, password!).subscribe({
      next: () => {
        this.snackbar.openFromComponent(SnackBarComponent, {
          duration: 2000,
          data: {
            message: 'Le mot de passe a été changé avec succès',
            success: true,
          },
        });
        this.router.navigate(['/login']);
      },
      error: () => {
        this.snackbar.openFromComponent(SnackBarComponent, {
          duration: 2000,
          data: {
            message: "Le mot ne passe n'a pas pu être changé",
            success: false,
          },
        });
      },
    });
  }
}
