import { Body, Controller, Post } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeDto } from './recipe.dto';
import { RecipeModel } from '@cookbook/models';

@Controller()
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  /**
   * Create a new recipe
   */
  @Post('recipes')
  create(@Body() body: RecipeDto): Promise<RecipeModel> {
    return this.recipeService.create(body);
  }
}
