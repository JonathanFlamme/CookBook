import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RecipeModel } from '@cookbook/models';
import { RecipeDeleteConfirmComponent } from '../../components/recipe-delete-confirm/recipe-delete-confirm.component';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.css',
})
export class RecipeCardComponent {
  @Input() public recipes: RecipeModel[] = [];

  constructor(private readonly dialog: MatDialog) {}

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
