import { CategoryType } from '@cookbook/models';
import { IsEnum } from 'class-validator';

export class CategoryDto {
  @IsEnum(CategoryType)
  type: CategoryType;
}
