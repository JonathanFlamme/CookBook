import { IngredientModel, UnitList } from '@cookbook/models';
import { IsEnum, IsString } from 'class-validator';

export class IngredientDto implements Partial<IngredientModel> {
  @IsString()
  name: string;

  @IsString()
  quantity: string;

  @IsEnum(UnitList)
  unit: UnitList;
}
