import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarModule,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar',
  standalone: true,
  imports: [CommonModule, MatSnackBarModule],
  templateUrl: './snack-bar.component.html',
  styleUrl: './snack-bar.component.scss',
})
export class SnackBarComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA)
    public data: { message: string },
  ) {}
}
