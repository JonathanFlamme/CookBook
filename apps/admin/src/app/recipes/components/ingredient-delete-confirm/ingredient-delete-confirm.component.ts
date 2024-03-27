import { Component, Inject } from '@angular/core';
import { IngredientModel, RecipeModel } from '@cookbook/models';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IngredientService } from '../../../shared/ingredients/ingredient.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../../../shared/ui/snack-bar/snack-bar.component';

@Component({
  selector: 'app-ingredient-delete-confirm',
  templateUrl: './ingredient-delete-confirm.component.html',
  styleUrl: './ingredient-delete-confirm.component.scss',
})
export class IngredientDeleteConfirmComponent {
  constructor(
    private dialogRef: MatDialogRef<IngredientDeleteConfirmComponent>,
    @Inject(MAT_DIALOG_DATA)
    public readonly data: {
      recipe: RecipeModel;
      ingredient: IngredientModel;
    },
    private readonly ingredientService: IngredientService,
    private readonly snackBar: MatSnackBar,
  ) {}

  public delete(): void {
    this.ingredientService
      .delete(
        this.data.recipe.userId,
        this.data.recipe.id,
        this.data.ingredient.id,
      )
      .subscribe({
        next: () => {
          this.snackBar.openFromComponent(SnackBarComponent, {
            duration: 2000,
            data: {
              message: "L'ingrédient a bien été supprimé",
              success: true,
            },
          });
          this.dialogRef.close(this.data.ingredient.id);
        },
        error: () => {
          this.dialogRef.close();
        },
      });
  }
}
