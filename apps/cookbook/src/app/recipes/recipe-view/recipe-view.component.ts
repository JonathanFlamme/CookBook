import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../shared/recipes/recipe.service';
import { Subscription } from 'rxjs';
import { RecipeModel } from '@cookbook/models';
import { StorageService } from '../../shared/auth/storage.service';
import { RecipeDeleteConfirmComponent } from '../components/recipe-delete-confirm/recipe-delete-confirm.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-recipe-view',
  templateUrl: './recipe-view.component.html',
  styleUrl: './recipe-view.component.scss',
})
export class RecipeViewComponent implements OnInit, OnDestroy {
  public loading = true;
  public recipe!: RecipeModel;

  // Check if the recipe belongs to the user
  public ownRecipe: boolean = false;

  private subscriptions: Subscription[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly recipeService: RecipeService,
    private readonly storageService: StorageService,
    private readonly dialog: MatDialog,
    private readonly router: Router,
  ) {}

  public ngOnInit(): void {
    const { slug } = this.route.snapshot.params;
    console.log('slug', slug);
    const sub = this.recipeService.view(slug).subscribe({
      next: (recipe) => {
        this.recipe = recipe;
        this.loading = false;

        const user = this.storageService.getSavedUser();
        if (user) {
          this.ownRecipe = recipe.userId === user.userId;
        }
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
        this.router.navigate(['/recipes']);
      }
    });
  }
}
