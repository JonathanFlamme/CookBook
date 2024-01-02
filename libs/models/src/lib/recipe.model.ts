import { CategoryModel } from './category.model';
import { IngredientModel } from './ingredient.model';
import { StepModel } from './step.model';

export interface RecipeModel {
  id: string;
  userId: string;
  title: string;
  duration: string;
  ingredients: IngredientModel[];
  steps: StepModel[];
  categories: CategoryModel[];
  createdAt: Date;
  updatedAt: Date;
}
