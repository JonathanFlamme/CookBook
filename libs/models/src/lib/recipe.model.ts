import { Category } from './category.model';
import { Ingredient } from './ingredient.model';
import { Step } from './step.model';

export interface Recipe {
  id: number;
  userId: number;
  name: string;
  duration: string;
  ingredients: Ingredient[];
  steps: Step[];
  categories: Category[];
  createAt: Date;
  updateAt: Date;
}
