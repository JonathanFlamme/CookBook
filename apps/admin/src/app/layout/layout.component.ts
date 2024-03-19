import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map } from 'rxjs';
import { UserModel } from '@cookbook/models';
import { AuthService } from '../shared/auth/auth.service';
import { SnackBarComponent } from '../components/ui/snack-bar/snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private readonly snackBar: MatSnackBar,
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
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 2000,
      data: { message: 'Vous êtes maintenant déconnecté' },
    });
  }
}
