import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map } from 'rxjs';
import { AuthService } from '../shared/auth/auth.service';
import { UserModel } from '@cookbook/models';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit {
  public reduced = false;
  public isLogged: UserModel | null = null;
  public isAdmin: boolean = false;

  public isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map((result) => result.matches));

  constructor(
    private breakpointObserver: BreakpointObserver,
    private readonly authService: AuthService,
  ) {}

  public ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();

    this.authService.isLogged$.subscribe({
      next: (isLogged) => {
        this.isLogged = isLogged;
      },
    });
  }

  public logout(): void {
    this.authService.logout();
  }
}
