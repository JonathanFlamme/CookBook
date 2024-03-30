import { IngredientModel, UnitList } from '../models/src/index';
import { IsEnum, IsString } from 'class-validator';

export class IngredientDto implements Partial<IngredientModel> {
  @IsString()
  name: string;

  @IsString()
  quantity: string;

  @IsEnum(UnitList)
  unit: UnitList;
}
