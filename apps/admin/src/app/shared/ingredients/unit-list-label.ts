import { UnitList } from '@cookbook/models';

export const unitListLabels: { value: UnitList; label: string }[] = [
  { value: UnitList.Gram, label: 'g' },
  { value: UnitList.Kilogram, label: 'kg' },
  { value: UnitList.Liter, label: 'l' },
  { value: UnitList.Centiliter, label: 'cl' },
  { value: UnitList.Milliliter, label: 'ml' },
  { value: UnitList.tablespoon, label: 'c.s' },
  { value: UnitList.teaspoon, label: 'c.c' },
];
