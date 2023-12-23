import { Body, Controller, Post } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeEntity } from './recipe.entity';

@Controller()
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  /**
   * Create a new recipe
   *
   */
  @Post('recipes')
  create(@Body() body: RecipeEntity): Promise<RecipeEntity> {
    return this.recipeService.create(body);
  }
}
