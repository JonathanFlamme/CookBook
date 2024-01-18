import {
  Body,
  Controller,
  Delete,
  Param,
  ParseUUIDPipe,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { IngredientService } from './ingredient.service'; // Import the 'IngredientService' class
import { IngredientDto } from './ingredient.dto';
import { IngredientEntity } from './ingredient.entity';
import { Request as RequestType } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.gard';

@Controller()
export class IngredientsController {
  constructor(private readonly ingredientService: IngredientService) {}

  /**
   * Update ingredients
   */
  @UseGuards(JwtAuthGuard)
  @Patch('recipes/:recipeId/ingredients')
  update(
    @Request() req: RequestType,
    @Param('recipeId', ParseUUIDPipe) recipeId: string,
    @Body() body: IngredientDto[],
  ): Promise<IngredientEntity[]> {
    console.log('body', body);

    return this.ingredientService.update(req, recipeId, body);
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
