import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { UserRequest } from '@cookbook/models';
import { Observable, map } from 'rxjs';
import { AuthService } from '../../shared/auth/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements OnInit {
  public isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map((result) => result.matches));

  public isLogged: UserRequest | null = null;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private readonly authService: AuthService,
  ) {}

  public ngOnInit(): void {
    this.authService.isLogged$.subscribe({
      next: (isLogged) => {
        this.isLogged = isLogged;
      },
    });
  }
}
