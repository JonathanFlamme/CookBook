import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { matchPassword } from './match-password.validator';
import { AuthService } from '../../shared/auth/auth.service';

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
      });
  }
}
