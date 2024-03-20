import { Component, Inject } from '@angular/core';
import { RecipeService } from '../../shared/recipes/recipe.service';
import { RecipeModel } from '@cookbook/models';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../ui/snack-bar/snack-bar.component';

@Component({
  selector: 'app-recipe-delete-confirm',
  templateUrl: './recipe-delete-confirm.component.html',
  styleUrl: './recipe-delete-confirm.component.scss',
})
export class RecipeDeleteConfirmComponent {
  constructor(
    private dialogRef: MatDialogRef<RecipeDeleteConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public readonly recipe: RecipeModel,
    private readonly recipeService: RecipeService,
    private readonly snackBar: MatSnackBar,
  ) {}

  public delete(): void {
    this.recipeService.delete(this.recipe.userId, this.recipe.id).subscribe({
      next: () => {
        this.snackBar.openFromComponent(SnackBarComponent, {
          duration: 2000,
          data: { message: 'La recette a bien été supprimée', success: true },
        });
        this.dialogRef.close(this.recipe.id);
      },
      error: () => {
        this.dialogRef.close();
      },
    });
  }
}
