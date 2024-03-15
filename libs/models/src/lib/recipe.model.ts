import { IngredientModel } from './ingredient.model';
import { StepModel } from './step.model';

export interface RecipeModel {
  id: string;
  userId: string;
  imageUrl: string;
  title: string;
  duration: string;
  categories: CategoryType[];
  ingredients: IngredientModel[];
  steps: StepModel[];
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
