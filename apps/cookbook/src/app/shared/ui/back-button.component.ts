import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {
  FaConfig,
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-back-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, FontAwesomeModule],
  template: `
    <button aria-label="Retour en arrière" mat-button (click)="goBack()">
      <fa-icon icon="arrow-left"></fa-icon>
    </button>
  `,
  styles: [
    `
      @use 'material/palette' as palette;
      button {
        position: absolute;
        top: 29px;
        left: 23px;
        font-size: 2rem;

        & fa-icon {
          color: palette.$accent;
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
  ) {
    this.config.defaultPrefix = 'fas';

    this.library.addIcons(faArrowLeft);
  }

  public goBack(): void {
    this.location.back();
  }
}
