import { Component, Input } from '@angular/core';
import { CategoryType } from '@cookbook/models';

@Component({
  selector: 'app-categories',
  template: `
    <ng-container [ngSwitch]="category">
      <span *ngSwitchCase="categories.Apero">Apero</span>
      <span *ngSwitchCase="categories.Entree">Entrée</span>
      <span *ngSwitchCase="categories.Plat">Plat</span>
      <span *ngSwitchCase="categories.Dessert">Dessert</span>
      <span *ngSwitchCase="categories.PetitDejeuner">Petit déjeuner</span>
      <span *ngSwitchCase="categories.Dejeuner">Dejeuner</span>
      <span *ngSwitchCase="categories.Diner">Diner</span>
    </ng-container>
  `,
  styles: [],
})
export class CategoriesComponent {
  @Input() category!: CategoryType;
  public categories = CategoryType;
}
