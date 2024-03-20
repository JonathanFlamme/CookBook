import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeDto } from './recipe.dto';
import {
  PaginatedResult,
  RecipeModel,
  UserRequest,
  UserRole,
} from '@cookbook/models';
import { RecipeEntity } from './recipe.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.gard';
import { User } from '../auth/user.decorator';
import { Auth } from '../auth/auth.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { RecipesListDto } from './recipes-list.dto';
import { SanitizerRecipePipe } from '../common/sanitize-recipe.pipe';

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
  list(@Query() query: RecipesListDto): Promise<PaginatedResult<RecipeEntity>> {
    return this.recipeService.list(query);
  }

  /**
   * List all recipes by user id
   */
  @Auth(UserRole.User)
  @UseGuards(JwtAuthGuard, AuthGuard)
  @Get('my-recipes')
  listByUserId(
    @User() user: UserRequest,
    @Query() query: RecipesListDto,
  ): Promise<PaginatedResult<RecipeEntity>> {
    return this.recipeService.listByUserId(query, user.userId);
  }

  /**
   * Create a new recipe
   */
  @Auth(UserRole.User)
  @UseGuards(JwtAuthGuard, AuthGuard)
  @Post('recipes')
  create(
    @User() user: UserRequest,
    @Body(new SanitizerRecipePipe()) body: RecipeDto,
  ): Promise<RecipeModel> {
    return this.recipeService.create(user.userId, body);
  }

  /**
   * Update a recipe
   */
  @Auth(UserRole.User)
  @UseGuards(JwtAuthGuard, AuthGuard)
  @Patch('recipes/:recipeId')
  update(
    @User() user: UserRequest,
    @Param('recipeId', ParseUUIDPipe) recipeId: string,
    @Body(new SanitizerRecipePipe()) body: RecipeDto,
  ): Promise<RecipeModel> {
    return this.recipeService.update(user.userId, recipeId, body);
  }

  /**
   * Delete a recipe
   */
  @Auth(UserRole.User)
  @UseGuards(JwtAuthGuard, AuthGuard)
  @Delete('recipes/:recipeId')
  delete(
    @User() user: UserRequest,
    @Param('recipeId', ParseUUIDPipe) recipeId: string,
  ): Promise<void> {
    return this.recipeService.delete(user.userId, recipeId);
  }

  /**
   * count recipes by month
   */
  @Auth(UserRole.User)
  @UseGuards(JwtAuthGuard, AuthGuard)
  @Get('count/recipes')
  getCount(@User() user: UserRequest): Promise<number> {
    return this.recipeService.countByMonth(user.userId);
  }
}
