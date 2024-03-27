import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../shared/auth/auth.service';
import { Router } from '@angular/router';
import { SnackBarComponent } from '../../shared/ui/snack-bar/snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public loginForm = this.fb.group({
    email: this.fb.control<string>('', Validators.required),
    password: this.fb.control<string>('', Validators.required),
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar,
  ) {}

  public login(): void {
    const { email, password } = this.loginForm.value;

    this.authService.login(email!, password!).subscribe({
      next: () => {
        this.snackBar.openFromComponent(SnackBarComponent, {
          duration: 2000,
          data: { message: 'Vous êtes maintenant connecté', success: true },
        });
        this.router.navigate(['/admin/recipes']);
      },
    });
  }
}
