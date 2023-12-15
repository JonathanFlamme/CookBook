export interface CategoryModel {
  id: number;
  recipeId: number;
  name: CategoryEnum;
}

export enum CategoryEnum {
  PetitDejeuner = 'petit-dejeuner',
  Dejeuner = 'dejeuner',
  Diner = 'diner',
  Dessert = 'dessert',
  Apero = 'apero',
  Entree = 'entree',
  Plat = 'plat',
}
