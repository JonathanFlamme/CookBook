import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../shared/recipes/recipe.service';
import { RecipeModel } from '@cookbook/models';
import { RecipeDeleteConfirmComponent } from '../components/recipe-delete-confirm/recipe-delete-confirm.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrl: './recipes-list.component.scss',
})
export class RecipesListComponent implements OnInit {
  constructor(
    private readonly dialog: MatDialog,
    private readonly recipeService: RecipeService,
  ) {}

  public recipes: RecipeModel[] = [];

  ngOnInit(): void {
    this.recipeService.list().subscribe({
      next: (recipes) => {
        this.recipes = recipes;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  public delete(recipe: RecipeModel): void {
    const dialogRef = this.dialog.open(RecipeDeleteConfirmComponent, {
      data: recipe,
    });

    dialogRef.afterClosed().subscribe((recipeId) => {
      if (recipeId) {
        this.recipes = this.recipes.filter((recipe) => recipe.id !== recipeId);
      }
    });
  }
}
