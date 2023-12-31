import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../shared/recipes/recipe.service';
import { Subscription } from 'rxjs';
import { RecipeModel } from '@cookbook/models';

@Component({
  selector: 'app-recipe-view',
  templateUrl: './recipe-view.component.html',
  styleUrl: './recipe-view.component.scss',
})
export class RecipeViewComponent implements OnInit, OnDestroy {
  public loading = true;
  public recipe!: RecipeModel;

  private subscriptions: Subscription[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly recipeService: RecipeService,
  ) {}

  public ngOnInit(): void {
    const { recipeId } = this.route.snapshot.params;

    const sub = this.recipeService.view(recipeId).subscribe({
      next: (recipe) => {
        this.recipe = recipe;
        this.loading = false;
      },
      error: (error) => {
        console.error(error);
        this.loading = false;
      },
    });
    this.subscriptions.push(sub);
  }

  public ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub?.unsubscribe());
  }
}
