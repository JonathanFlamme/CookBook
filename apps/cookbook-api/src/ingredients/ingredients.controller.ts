import { Controller, Delete, Param, ParseUUIDPipe } from '@nestjs/common';
import { IngredientService } from './ingredient.service'; // Import the 'IngredientService' class

@Controller()
export class IngredientsController {
  constructor(private readonly ingredientService: IngredientService) {}

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
