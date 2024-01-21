import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeDto } from './recipe.dto';
import { RecipeModel } from '@cookbook/models';
import { RecipeEntity } from './recipe.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.gard';
import { Request as RequestType } from 'express';

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
  listByUserId(@Request() req: RequestType): Promise<RecipeEntity[]> {
    return this.recipeService.listByUserId(req);
  }

  /**
   * Create a new recipe
   */
  @UseGuards(JwtAuthGuard)
  @Post('recipes')
  create(
    @Request() req: RequestType,
    @Body() body: RecipeDto,
  ): Promise<RecipeModel> {
    return this.recipeService.create(req, body);
  }

  /**
   * Update a recipe
   */
  @UseGuards(JwtAuthGuard)
  @Patch('recipes/:recipeId')
  update(
    @Request() req: RequestType,
    @Param('recipeId', ParseUUIDPipe) recipeId: string,
    @Body() body: RecipeDto,
  ): Promise<RecipeModel> {
    return this.recipeService.update(req, recipeId, body);
  }

  /**
   * Delete a recipe
   */
  @UseGuards(JwtAuthGuard)
  @Delete('recipes/:recipeId')
  delete(
    @Request() req: RequestType,
    @Param('recipeId', ParseUUIDPipe) recipeId: string,
  ): Promise<void> {
    return this.recipeService.delete(req, recipeId);
  }
}
