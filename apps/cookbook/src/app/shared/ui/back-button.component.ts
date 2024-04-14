import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {
  FaConfig,
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Observable, map } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-back-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, FontAwesomeModule],
  template: `
    <button
      aria-label="Retour en arrière"
      mat-button
      (click)="goBack()"
      [ngClass]="{ isHandset: isHandset$ | async }"
    >
      <fa-icon icon="arrow-left"></fa-icon>
    </button>
  `,
  styles: [
    `
      @use 'material/palette' as palette;

      button {
        position: absolute;
        top: 15px;
        font-size: 2rem;

        & fa-icon {
          color: palette.$gray;
        }

        &.isHandset {
          top: 12px;
          left: 10px;

          & fa-icon {
            color: white;
          }
        }
      }
    `,
  ],
})
export class BackButtonComponent {
  constructor(
    private readonly library: FaIconLibrary,
    private readonly config: FaConfig,
    private readonly location: Location,
    private breakpointObserver: BreakpointObserver,
  ) {
    this.config.defaultPrefix = 'fas';

    this.library.addIcons(faArrowLeft);
  }

  public isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map((result) => result.matches));

  public goBack(): void {
    this.location.back();
  }
}
