import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { RecipeService } from './recipe.service';

import { RecipeEntity } from './recipe.entity';
import { RecipesListDto } from './recipes-list.dto';
import { PaginatedResult } from '@cookbook/models';

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
  list(@Query() query: RecipesListDto): Promise<PaginatedResult<RecipeEntity>> {
    return this.recipeService.list(query);
  }
}
