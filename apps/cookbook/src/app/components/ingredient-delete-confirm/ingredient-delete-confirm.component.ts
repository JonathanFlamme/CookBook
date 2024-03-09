import { Component, Inject } from '@angular/core';
import { IngredientModel } from '@cookbook/models';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IngredientService } from '../../shared/ingredients/ingredient.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../ui/snack-bar/snack-bar.component';

@Component({
  selector: 'app-ingredient-delete-confirm',
  templateUrl: './ingredient-delete-confirm.component.html',
  styleUrl: './ingredient-delete-confirm.component.scss',
})
export class IngredientDeleteConfirmComponent {
  constructor(
    private dialogRef: MatDialogRef<IngredientDeleteConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public readonly ingredient: IngredientModel,
    private readonly ingredientService: IngredientService,
    private readonly snackBar: MatSnackBar,
  ) {}

  public delete(): void {
    this.ingredientService.delete(this.ingredient.id).subscribe({
      next: () => {
        this.snackBar.openFromComponent(SnackBarComponent, {
          duration: 2000,
          data: { message: "L'ingrédient a bien été supprimé" },
        });
        this.dialogRef.close(this.ingredient.id);
      },
      error: (error) => {
        this.dialogRef.close();
        console.error(error);
      },
    });
  }
}
