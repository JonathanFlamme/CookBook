import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { RecipeModel, UserRequest } from '@cookbook/models';
import { AuthService } from '../../auth/auth.service';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, RouterModule],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.scss',
})
export class RecipeCardComponent implements OnInit {
  @Input() public recipes: RecipeModel[] = [];

  public isLogged: UserRequest | null = null;
  public pageEvent = new PageEvent();

  constructor(private readonly authService: AuthService) {}

  public ngOnInit(): void {
    this.authService.isLogged$.subscribe({
      next: (isLogged) => {
        this.isLogged = isLogged;
      },
    });
  }
}
