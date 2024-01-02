export interface CategoryModel {
  id: string;
  recipeId: string;
  type: CategoryType;
  createdAt: Date;
  updatedAt: Date;
}

export enum CategoryType {
  PetitDejeuner = 'petit-dejeuner',
  Dejeuner = 'dejeuner',
  Diner = 'diner',
  Dessert = 'dessert',
  Apero = 'apero',
  Entree = 'entree',
  Plat = 'plat',
  Milkshake = 'milkshake',
}
