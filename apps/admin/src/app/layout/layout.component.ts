import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map, take } from 'rxjs';
import { AuthService } from '../shared/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserRequest } from '@cookbook/models';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit {
  public reduced = false;
  public isLogged: UserRequest | null = null;
  public isAdmin: Observable<boolean> = new Observable<boolean>();

  public isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map((result) => result.matches));

  constructor(
    private breakpointObserver: BreakpointObserver,
    private readonly authService: AuthService,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router,
  ) {}

  public ngOnInit(): void {
    // check if user is an admin
    this.isAdmin = this.authService.isAdmin$;

    // check if user is logged
    this.authService.isLogged$.subscribe({
      next: (isLogged) => {
        this.isLogged = isLogged;
      },
    });
  }

  public logout(): void {
    this.authService.logout();
    this.router.navigate(['/admin', 'login']);
  }

  public closeNavbar(drawer: MatSidenav): void {
    this.isHandset$.pipe(take(1)).subscribe((isHandset) => {
      if (isHandset) {
        drawer.close();
      }
    });
  }
}
