import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule],
  template: '',
  styles: [
    `
      :host {
        display: block;
        width: 100%;
        height: 100vh;
        background-image: url('/assets/404.png');
        background-size: cover;
        background-position: center;
      }
    `,
  ],
})
export class NotFoundComponent {}
