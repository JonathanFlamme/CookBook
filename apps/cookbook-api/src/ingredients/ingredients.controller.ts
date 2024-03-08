import {
  Body,
  Controller,
  Delete,
  Param,
  ParseUUIDPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { IngredientService } from './ingredient.service'; // Import the 'IngredientService' class
import { IngredientDto } from './ingredient.dto';
import { IngredientEntity } from './ingredient.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.gard';
import { User } from '../auth/user.decorator';
import { SanitizerPipe } from '../common/sanitizer.pipe';
import { UserRequest, UserRole } from '@cookbook/models';
import { Auth } from '../auth/auth.decorator';
import { AuthGuard } from '../auth/auth.guard';

@Controller()
export class IngredientsController {
  constructor(private readonly ingredientService: IngredientService) {}

  /**
   * Update ingredients
   */
  @Auth(UserRole.Admin)
  @UseGuards(JwtAuthGuard, AuthGuard)
  @Patch('recipes/:recipeId/ingredients')
  update(
    @User() user: UserRequest,
    @Param('recipeId', ParseUUIDPipe) recipeId: string,
    @Body(new SanitizerPipe()) body: IngredientDto[],
  ): Promise<IngredientEntity[]> {
    return this.ingredientService.update(user.userId, recipeId, body);
  }

  /**
   * Delete an ingredient
   */
  @Auth(UserRole.Admin)
  @UseGuards(JwtAuthGuard, AuthGuard)
  @Delete('ingredients/:ingredientId')
  delete(
    @Param('ingredientId', ParseUUIDPipe) ingredientId: string,
  ): Promise<void> {
    return this.ingredientService.delete(ingredientId);
  }
}
