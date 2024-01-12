import { IsString, IsOptional } from 'class-validator';
import { IngredientDto } from '../ingredients/ingredient.dto';
import { StepDto } from '../steps/step.dto';
import { CategoryType } from '@cookbook/models';

export class RecipeDto {
  @IsString()
  title: string;

  @IsString()
  duration: string;

  @IsOptional()
  ingredients?: IngredientDto[];

  @IsOptional()
  steps?: StepDto[];

  @IsOptional()
  categories?: CategoryType[];
}
