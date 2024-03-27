export interface IngredientModel {
  id: string;
  recipeId: string;
  name: string;
  quantity: string;
  unit: UnitList;
  createdAt: Date;
  updatedAt: Date;
}

export enum UnitList {
  Gram = 'gram',
  Kilogram = 'kiloGram',
  Liter = 'liter',
  Centiliter = 'centiliter',
  Milliliter = 'milliliter',
  tablespoon = 'tablespoon',
  teaspoon = 'teaspoon',
}
