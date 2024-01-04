import {
  Body,
  Controller,
  Delete,
  Param,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';
import { IngredientService } from './ingredient.service'; // Import the 'IngredientService' class
import { IngredientDto } from './ingredient.dto';
import { IngredientEntity } from './ingredient.entity';

@Controller()
export class IngredientsController {
  constructor(private readonly ingredientService: IngredientService) {}

  /**
   * Update ingredients
   */
  @Patch('recipes/:recipeId/ingredients')
  update(
    @Param('recipeId', ParseUUIDPipe) recipeId: string,
    @Body() body: IngredientDto[],
  ): Promise<IngredientEntity[]> {
    console.log('body', body);

    return this.ingredientService.update(recipeId, body);
  }

  /**
   * Delete an ingredient
   */
  @Delete('ingredients/:ingredientId')
  delete(
    @Param('ingredientId', ParseUUIDPipe) ingredientId: string,
  ): Promise<void> {
    return this.ingredientService.delete(ingredientId);
  }
}
