import { IngredientModel } from '@cookbook/models';
import { IsString } from 'class-validator';

export class IngredientDto implements Partial<IngredientModel> {
  @IsString()
  name: string;

  @IsString()
  quantity: string;
}
