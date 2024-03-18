import {
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';

import { RecipeEntity } from './recipe.entity';
import { RecipesListDto } from './recipes-list.dto';
import { PaginatedResult, UserRole } from '@cookbook/models';
import { Auth } from '../auth/auth.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.gard';
import { AuthGuard } from '../auth/auth.guard';

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

  /**
   * Delete a recipe
   */
  @Auth(UserRole.Admin)
  @UseGuards(JwtAuthGuard, AuthGuard)
  @Delete('users/:userId/recipes/:recipeId')
  delete(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('recipeId', ParseUUIDPipe) recipeId: string,
  ): Promise<void> {
    return this.recipeService.delete(userId, recipeId);
  }
}
