import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../shared/recipes/recipe.service';
import { Subscription } from 'rxjs';
import { RecipeModel } from '@cookbook/models';
import { MatDialog } from '@angular/material/dialog';
import { RecipeDeleteConfirmComponent } from '../components/recipe-delete-confirm/recipe-delete-confirm.component';

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
    private readonly dialog: MatDialog,
    private readonly router: Router,
  ) {}

  public ngOnInit(): void {
    const { recipeId } = this.route.snapshot.params;
    const sub = this.recipeService.view(recipeId).subscribe({
      next: (recipe) => {
        this.recipe = recipe;
        this.loading = false;
      },
    });
    this.subscriptions.push(sub);
  }

  public ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub?.unsubscribe());
  }

  public delete(recipe: RecipeModel): void {
    const dialogRef = this.dialog.open(RecipeDeleteConfirmComponent, {
      data: recipe,
    });

    dialogRef.afterClosed().subscribe((recipeId) => {
      if (recipeId) {
        this.router.navigate(['/admin', 'recipes']);
      }
    });
  }
}
