import { CategoryModel } from './category.model';
import { IngredientModel } from './ingredient.model';
import { StepModel } from './step.model';

export interface RecipeModel {
  id: number;
  userId: number;
  name: string;
  duration: string;
  ingredients: IngredientModel[];
  steps: StepModel[];
  categories: CategoryModel[];
  createAt: Date;
  updateAt: Date;
}
