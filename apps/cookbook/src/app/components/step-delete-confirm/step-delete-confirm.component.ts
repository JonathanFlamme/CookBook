import { Component, Inject } from '@angular/core';
import { StepModel } from '@cookbook/models';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StepService } from '../../shared/steps/step.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../ui/snack-bar/snack-bar.component';
@Component({
  selector: 'app-step-delete-confirm',
  templateUrl: './step-delete-confirm.component.html',
  styleUrl: './step-delete-confirm.component.scss',
})
export class StepDeleteConfirmComponent {
  constructor(
    private dialogRef: MatDialogRef<StepDeleteConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public readonly step: StepModel,
    private readonly stepService: StepService,
    private readonly snackBar: MatSnackBar,
  ) {}

  public delete(): void {
    this.stepService.delete(this.step.recipeId, this.step.id).subscribe({
      next: () => {
        this.snackBar.openFromComponent(SnackBarComponent, {
          duration: 2000,
          data: { message: "L'étape a bien été supprimé", success: true },
        });
        this.dialogRef.close(this.step.id);
      },
      error: (error) => {
        this.snackBar.openFromComponent(SnackBarComponent, {
          duration: 2000,
          data: { message: "Une erreur s'est produite", success: false },
        });
        this.dialogRef.close();
        console.error(error);
      },
    });
  }
}
