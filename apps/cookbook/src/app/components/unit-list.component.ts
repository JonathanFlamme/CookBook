import { Component, Input } from '@angular/core';
import { UnitList } from '@cookbook/models';

@Component({
  selector: 'app-unit-list',
  template: `
    <ng-container [ngSwitch]="unit">
      <span *ngSwitchCase="units.Gram">g</span>
      <span *ngSwitchCase="units.Kilogram">kg</span>
      <span *ngSwitchCase="units.Liter">l</span>
      <span *ngSwitchCase="units.Milliliter">ml</span>
      <span *ngSwitchCase="units.Centiliter">cl</span>
      <span *ngSwitchCase="units.tablespoon">c.s</span>
      <span *ngSwitchCase="units.teaspoon">c.c</span>
    </ng-container>
  `,
  styles: [],
})
export class UnitListComponent {
  @Input() unit!: UnitList;
  public units = UnitList;
}
