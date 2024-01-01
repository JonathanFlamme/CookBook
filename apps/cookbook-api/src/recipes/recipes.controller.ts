import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeDto } from './recipe.dto';
import { RecipeModel } from '@cookbook/models';
import { RecipeEntity } from './recipe.entity';

@Controller()
export class RecipeController {
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

  /**
   * Create a new recipe
   */
  @Post('recipes')
  create(@Body() body: RecipeDto): Promise<RecipeModel> {
    return this.recipeService.create(body);
  }

  /**
   * Update a recipe
   */
  @Patch('recipes/:recipeId')
  update(
    @Param('recipeId', ParseUUIDPipe) recipeId: string,
    @Body() body: RecipeDto,
  ): Promise<RecipeModel> {
    return this.recipeService.update(recipeId, body);
  }

  /**
   * Delete a recipe
   */
  @Delete('recipes/:recipeId')
  delete(@Param('recipeId', ParseUUIDPipe) recipeId: string): Promise<void> {
    return this.recipeService.delete(recipeId);
  }
}
