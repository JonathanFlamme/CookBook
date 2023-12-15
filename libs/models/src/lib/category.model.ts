export interface CategoryModel {
  id: number;
  recipeId: number;
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
}
