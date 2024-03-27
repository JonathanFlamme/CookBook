import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';

import { RecipeEntity } from './recipe.entity';
import { RecipesListDto } from './recipes-list.dto';
import { PaginatedResult, RecipeModel, UserRole } from '@cookbook/models';
import { Auth } from '../auth/auth.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.gard';
import { AuthGuard } from '../auth/auth.guard';
import { SanitizerRecipePipe } from '../common/sanitize-recipe.pipe';
import { RecipeDto } from './recipe.dto';

@Controller('admin')
export class RecipeAdminController {
  constructor(private readonly recipeService: RecipeService) {}

  /**
   * View a recipe
   */
  @Auth(UserRole.Admin)
  @UseGuards(JwtAuthGuard, AuthGuard)
  @Get('recipes/:recipeId')
  view(
    @Param('recipeId', ParseUUIDPipe) recipeId: string,
  ): Promise<RecipeEntity> {
    return this.recipeService.view(recipeId);
  }
  /**
   * List all recipes
   */
  @Auth(UserRole.Admin)
  @UseGuards(JwtAuthGuard, AuthGuard)
  @Get('recipes')
  list(@Query() query: RecipesListDto): Promise<PaginatedResult<RecipeEntity>> {
    return this.recipeService.list(query);
  }

  /**
   * Update a recipe
   */
  @Auth(UserRole.Admin)
  @UseGuards(JwtAuthGuard, AuthGuard)
  @Patch('users/:userId/recipes/:recipeId')
  update(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('recipeId', ParseUUIDPipe) recipeId: string,
    @Body(new SanitizerRecipePipe()) body: RecipeDto,
  ): Promise<RecipeModel> {
    return this.recipeService.update(userId, recipeId, body);
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
