import { Component, Inject } from '@angular/core';
import { StepModel } from '@cookbook/models';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StepService } from '../../shared/steps/step.service';
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
  ) {}

  public delete(): void {
    this.stepService.delete(this.step.recipeId, this.step.id).subscribe({
      next: () => {
        this.dialogRef.close(this.step.id);
      },
      error: (error) => {
        this.dialogRef.close();
        console.error(error);
      },
    });
  }
}
