import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeDto } from './recipe.dto';
import { RecipeModel } from '@cookbook/models';
import { RecipeEntity } from './recipe.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.gard';
import { User } from '../auth/user.decorateur';
import { UserEntity } from '../users/user.entity';

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

  /*
   * List all recipes by user id
   */
  @UseGuards(JwtAuthGuard)
  @Get('my-recipes')
  listByUserId(@User() user: UserEntity): Promise<RecipeEntity[]> {
    return this.recipeService.listByUserId(user.id);
  }

  /**
   * Create a new recipe
   */
  @UseGuards(JwtAuthGuard)
  @Post('recipes')
  create(
    @User() user: UserEntity,
    @Body() body: RecipeDto,
  ): Promise<RecipeModel> {
    return this.recipeService.create(user.id, body);
  }

  /**
   * Update a recipe
   */
  @UseGuards(JwtAuthGuard)
  @Patch('recipes/:recipeId')
  update(
    @User() user: UserEntity,
    @Param('recipeId', ParseUUIDPipe) recipeId: string,
    @Body() body: RecipeDto,
  ): Promise<RecipeModel> {
    return this.recipeService.update(user.id, recipeId, body);
  }

  /**
   * Delete a recipe
   */
  @UseGuards(JwtAuthGuard)
  @Delete('recipes/:recipeId')
  delete(
    @User() user: UserEntity,
    @Param('recipeId', ParseUUIDPipe) recipeId: string,
  ): Promise<void> {
    return this.recipeService.delete(user.id, recipeId);
  }
}
