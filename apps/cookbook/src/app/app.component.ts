import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public title = 'cookbook';

  constructor(private readonly authService: AuthService) {}

  public ngOnInit(): void {
    this.authService.autoLogin();
  }
}
