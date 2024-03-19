import {
  Body,
  Controller,
  Delete,
  Param,
  ParseUUIDPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { IngredientDto } from './ingredient.dto';
import { IngredientEntity } from './ingredient.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.gard';
import { SanitizerPipe } from '../common/sanitizer.pipe';
import { UserRole } from '@cookbook/models';
import { Auth } from '../auth/auth.decorator';
import { AuthGuard } from '../auth/auth.guard';

@Controller('admin')
export class IngredientsAdminController {
  constructor(private readonly ingredientService: IngredientService) {}

  /**
   * Update ingredients
   */
  @Auth(UserRole.Admin)
  @UseGuards(JwtAuthGuard, AuthGuard)
  @Patch('users/:userId/recipes/:recipeId/ingredients')
  update(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('recipeId', ParseUUIDPipe) recipeId: string,
    @Body(new SanitizerPipe()) body: IngredientDto[],
  ): Promise<IngredientEntity[]> {
    return this.ingredientService.update(userId, recipeId, body);
  }

  /**
   * Delete an ingredient
   */
  @Auth(UserRole.Admin)
  @UseGuards(JwtAuthGuard, AuthGuard)
  @Delete('users/:userId/ingredients/:ingredientId')
  delete(
    @Param('ingredientId', ParseUUIDPipe) ingredientId: string,
  ): Promise<void> {
    return this.ingredientService.delete(ingredientId);
  }
}
