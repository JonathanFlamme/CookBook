import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map, take } from 'rxjs';
import { AuthService } from '../shared/auth/auth.service';
import { UserRequest } from '@cookbook/models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../shared/ui/snack-bar/snack-bar.component';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit {
  public reduced = false;
  public isLogged: UserRequest | null = null;
  public isAdmin$: Observable<boolean> = new Observable<boolean>();

  public isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map((result) => result.matches));

  constructor(
    private breakpointObserver: BreakpointObserver,
    private readonly authService: AuthService,
    private readonly snackBar: MatSnackBar,
  ) {}

  public ngOnInit(): void {
    this.isAdmin$ = this.authService.isAdmin$;

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

  public closeNavbar(drawer: MatSidenav): void {
    this.isHandset$.pipe(take(1)).subscribe((isHandset) => {
      if (isHandset) {
        drawer.close();
      }
    });
  }
}
