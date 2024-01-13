import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public loginForm = this.fb.group({
    identifier: this.fb.control<string>('', Validators.required),
    password: this.fb.control<string>('', Validators.required),
  });

  constructor(private readonly fb: FormBuilder) {}

  public login(): void {
    console.log(this.loginForm.value);
  }
}
