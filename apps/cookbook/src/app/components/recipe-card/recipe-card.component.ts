import { Component, Input } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeModel } from '@cookbook/models';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.scss',
})
export class RecipeCardComponent {
  @Input() public recipes: RecipeModel[] = [];

  public pageEvent = new PageEvent();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {}

  public recipeView(recipeId: string): void {
    this.route.queryParams.subscribe((params) => {
      this.router.navigate(['/recipes', recipeId], { queryParams: params });
    });
  }
}
