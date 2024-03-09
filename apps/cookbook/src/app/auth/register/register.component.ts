import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { matchPassword } from './match-password.validator';
import { AuthService } from '../../shared/auth/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../../components/ui/snack-bar/snack-bar.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
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
    private readonly router: Router,
    private readonly snackBar: MatSnackBar,
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

          this.snackBar.openFromComponent(SnackBarComponent, {
            duration: 2000,
            data: { message: 'Vous être bien inscrit' },
          });

          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error(error);
        },
      });
  }
}
