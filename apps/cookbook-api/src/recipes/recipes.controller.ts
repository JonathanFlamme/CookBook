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
import { RecipeModel, UserRequest, UserRole } from '@cookbook/models';
import { RecipeEntity } from './recipe.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.gard';
import { User } from '../auth/user.decorateur';
import { SanitizerPipe } from '../common/sanitizer.pipe';
import { Auth } from '../auth/auth.decorator';
import { AuthGuard } from '../auth/auth.guard';

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
  listByUserId(@User() user: UserRequest): Promise<RecipeEntity[]> {
    return this.recipeService.listByUserId(user.userId);
  }

  /**
   * Create a new recipe
   */
  @Auth(UserRole.Admin)
  @UseGuards(JwtAuthGuard, AuthGuard)
  @Post('recipes')
  create(
    @User() user: UserRequest,
    @Body(new SanitizerPipe()) body: RecipeDto,
  ): Promise<RecipeModel> {
    return this.recipeService.create(user.userId, body);
  }

  /**
   * Update a recipe
   */
  @Auth(UserRole.Admin)
  @UseGuards(JwtAuthGuard, AuthGuard)
  @Patch('recipes/:recipeId')
  update(
    @User() user: UserRequest,
    @Param('recipeId', ParseUUIDPipe) recipeId: string,
    @Body(new SanitizerPipe()) body: RecipeDto,
  ): Promise<RecipeModel> {
    return this.recipeService.update(user.userId, recipeId, body);
  }

  /**
   * Delete a recipe
   */
  @Auth(UserRole.Admin)
  @UseGuards(JwtAuthGuard, AuthGuard)
  @Delete('recipes/:recipeId')
  delete(
    @User() user: UserRequest,
    @Param('recipeId', ParseUUIDPipe) recipeId: string,
  ): Promise<void> {
    return this.recipeService.delete(user.userId, recipeId);
  }
}
