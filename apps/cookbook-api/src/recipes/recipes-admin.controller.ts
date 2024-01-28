import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { RecipeService } from './recipe.service';

import { RecipeEntity } from './recipe.entity';

@Controller('admin')
export class RecipeAdminController {
  constructor(private readonly recipeService: RecipeService) {}

  /**
   * View a recipe
   */
  @Get('recipes/:recipeId')
  view(
    @Param('recipeId', ParseUUIDPipe) recipeId: string,
  ): Promise<RecipeEntity> {
    return this.recipeService.view(recipeId);
  }
  /**
   * List all recipes
   */
  @Get('recipes')
  list(): Promise<RecipeEntity[]> {
    return this.recipeService.list();
  }
}
