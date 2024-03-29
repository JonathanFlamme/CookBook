import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeService } from '../recipes/recipe.service';

@Component({
  selector: 'app-quota-recipe-by-month',
  standalone: true,
  imports: [CommonModule],
  template: '{{ count }} / {{ quotas }}',
  styles: [],
})
export class QuotaRecipeByMonthComponent implements OnInit {
  @Input() quotas: number = 0;

  constructor(private readonly recipeService: RecipeService) {}

  public count: number = 0;

  public ngOnInit(): void {
    this.recipeService.count().subscribe({
      next: (count) => {
        this.count = count;
      },
    });
  }
}
