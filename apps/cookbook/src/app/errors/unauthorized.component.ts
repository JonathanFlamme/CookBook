import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { StorageService } from '../shared/auth/storage.service';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  template: `
    <div class="container">
      <button mat-raised-button color="green" (click)="return()">
        Connectez-vous
      </button>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
        height: 100vh;
        background-image: url('/assets/unauthorized.png');
        background-size: cover;
        background-position: center;
      }
      .container {
        text-align: center;
        padding-top: 87vh;
      }
    `,
  ],
})
export class UnauthorizedComponent {
  constructor(
    private readonly storageService: StorageService,
    private readonly router: Router,
  ) {}

  public return(): void {
    this.storageService.clean();
    this.router.navigate(['/login']);
  }
}
