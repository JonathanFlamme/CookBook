import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
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
   * Delete a recipe
   */
  @Delete('recipes/:recipeId')
  delete(@Param('recipeId', ParseUUIDPipe) recipeId: string): Promise<void> {
    return this.recipeService.delete(recipeId);
  }
}
