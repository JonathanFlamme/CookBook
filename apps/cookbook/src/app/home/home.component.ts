import {  Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map, shareReplay } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent  {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  public sidenavOpened = false;

  public isHandset$: Observable<boolean> = this.breakpointObserver
  .observe(Breakpoints.Handset)
  .pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    ) {}

  toggleMenu() {
    this.sidenavOpened = !this.sidenavOpened;
    this.sidenav.toggle();
  }
}
