import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { matchPassword } from './match-password.validator';
import { AuthService } from '../../shared/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../../shared/ui/snack-bar/snack-bar.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  public isRegister: boolean = false;

  public registerForm = this.fb.group(
    {
      givenName: this.fb.control<string>('', Validators.required),
      familyName: this.fb.control<string>('', Validators.required),
      email: this.fb.control<string>('', Validators.required),
      password: this.fb.control<string>('', Validators.required),
      confirmPassword: this.fb.control<string>('', Validators.required),
    },
    { validators: matchPassword },
  );

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly snackbar: MatSnackBar,
  ) {}

  public register(): void {
    const register = this.registerForm.value;

    this.authService
      .register(
        register.givenName!,
        register.familyName!,
        register.email!,
        register.password!,
        register.confirmPassword!,
      )
      .subscribe({
        next: () => {
          this.registerForm.reset();
          this.isRegister = true;
        },
        error: (error) => {
          if (error.status === 409) {
            this.snackbar.openFromComponent(SnackBarComponent, {
              data: {
                message: 'Cette adresse mail est déjà utilisée.',
                succes: false,
              },
              duration: 2000,
            });
          }
        },
      });
  }
}
