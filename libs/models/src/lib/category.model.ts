export interface CategoryModel {
  id: string;
  recipeId: string;
  type: CategoryType;
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
