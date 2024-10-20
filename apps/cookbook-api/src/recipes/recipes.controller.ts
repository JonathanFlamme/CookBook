import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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
  @Get('recipes/:slug')
  view(@Param('slug') slug: string): Promise<RecipeEntity> {
    console.log('slug', slug);
    return this.recipeService.view(slug);
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
  @Patch('recipes/:slug')
  update(
    @User() user: UserRequest,
    @Param('slug') slug: string,
    @Body(new SanitizerRecipePipe()) body: RecipeDto,
  ): Promise<RecipeModel> {
    return this.recipeService.update(user.userId, slug, body);
  }

  /**
   * Delete a recipe
   */
  @Auth(UserRole.User)
  @UseGuards(JwtAuthGuard, AuthGuard)
  @Delete('recipes/:slug')
  delete(
    @User() user: UserRequest,
    @Param('slug') slug: string,
  ): Promise<void> {
    return this.recipeService.delete(user.userId, slug);
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

  /**
   * Get last 10 recipes
   */
  @Get('last')
  lastRecipes(): Promise<RecipeModel[]> {
    return this.recipeService.lastRecipes();
  }
}
