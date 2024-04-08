import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-recipes-filter-bottom-sheet',
  templateUrl: './recipes-filter-bottom-sheet.component.html',
  styleUrl: './recipes-filter-bottom-sheet.component.scss',
})
export class RecipesFilterBottomSheetComponent {
  public filterForm = this.fb.group({
    orderBy: this.fb.control<string>('updatedAt'),
    order: this.fb.control<string>('DESC'),
  });
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA)
    public data: { order: string; orderBy: string },
    private bottomSheetRef: MatBottomSheetRef<RecipesFilterBottomSheetComponent>,
    private readonly fb: FormBuilder,
  ) {
    this.filterForm.patchValue({ orderBy: data.orderBy, order: data.order });
  }

  public reset(): void {
    this.filterForm.reset({
      orderBy: 'updatedAt',
      order: 'DESC',
    });
  }

  public sent(): void {
    this.bottomSheetRef.dismiss(this.filterForm.value);
  }
}
