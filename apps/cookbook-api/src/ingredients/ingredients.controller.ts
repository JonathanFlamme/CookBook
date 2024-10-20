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
import { UserRequest, UserRole } from '@cookbook/models';
import { Auth } from '../auth/auth.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { SanitizerIngredientPipe } from '../common/sanitizer-ingredient.pipe';

@Controller()
export class IngredientsController {
  constructor(private readonly ingredientService: IngredientService) {}

  /**
   * Update ingredients
   */
  @Auth(UserRole.User)
  @UseGuards(JwtAuthGuard, AuthGuard)
  @Patch('recipes/:slug/ingredients')
  update(
    @User() user: UserRequest,
    @Param('slug') slug: string,
    @Body(new SanitizerIngredientPipe()) body: IngredientDto[],
  ): Promise<IngredientEntity[]> {
    return this.ingredientService.update(user.userId, slug, body);
  }

  /**
   * Delete an ingredient
   */
  @Auth(UserRole.User)
  @UseGuards(JwtAuthGuard, AuthGuard)
  @Delete('recipes/:slug/ingredients/:ingredientId')
  delete(
    @User() user: UserRequest,
    @Param('slug') slug: string,
    @Param('ingredientId', ParseUUIDPipe) ingredientId: string,
  ): Promise<void> {
    return this.ingredientService.delete(user.userId, slug, ingredientId);
  }
}
