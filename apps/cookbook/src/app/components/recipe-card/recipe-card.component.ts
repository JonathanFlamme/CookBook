import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { RecipeModel, UserModel } from '@cookbook/models';
import { AuthService } from '../../shared/auth/auth.service';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.scss',
})
export class RecipeCardComponent implements OnInit {
  @Input() public recipes: RecipeModel[] = [];

  public isLogged: UserModel | null = null;
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
