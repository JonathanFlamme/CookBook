import { Component, Inject } from '@angular/core';
import { RecipeService } from '../../shared/recipes/recipe.service';
import { RecipeModel } from '@cookbook/models';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-recipe-delete-confirm',
  templateUrl: './recipe-delete-confirm.component.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  styleUrl: './recipe-delete-confirm.component.scss',
})
export class RecipeDeleteConfirmComponent {
  constructor(
    private dialogRef: MatDialogRef<RecipeDeleteConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public readonly recipe: RecipeModel,
    private readonly recipeService: RecipeService,
  ) {}

  public delete(): void {
    this.recipeService.delete(this.recipe.id).subscribe({
      next: () => {
        this.dialogRef.close(this.recipe.id);
      },
      error: (error) => {
        this.dialogRef.close();
        console.error(error);
      },
    });
  }
}
