import {
  Body,
  Controller,
  Delete,
  Param,
  ParseUUIDPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { IngredientService } from './ingredient.service'; // Import the 'IngredientService' class
import { IngredientDto } from './ingredient.dto';
import { IngredientEntity } from './ingredient.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.gard';
import { User } from '../auth/user.decorateur';
import { SanitizerPipe } from '../common/sanitizer.pipe';
import { UserRequest } from '@cookbook/models';

@Controller()
export class IngredientsController {
  constructor(private readonly ingredientService: IngredientService) {}

  /**
   * Update ingredients
   */
  @UseGuards(JwtAuthGuard)
  @Patch('recipes/:recipeId/ingredients')
  update(
    @User() user: UserRequest,
    @Param('recipeId', ParseUUIDPipe) recipeId: string,
    @Body(new SanitizerPipe()) body: IngredientDto[],
  ): Promise<IngredientEntity[]> {
    return this.ingredientService.update(user.userId, recipeId, body);
  }

  /**
   * Delete an ingredient
   */
  @UseGuards(JwtAuthGuard)
  @Delete('ingredients/:ingredientId')
  delete(
    @Param('ingredientId', ParseUUIDPipe) ingredientId: string,
  ): Promise<void> {
    return this.ingredientService.delete(ingredientId);
  }
}
