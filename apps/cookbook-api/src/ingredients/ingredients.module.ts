import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngredientEntity } from './ingredient.entity';
import { IngredientsController } from './ingredients.controller';
import { IngredientService } from './ingredient.service';
import { RecipeEntity } from '../recipes/recipe.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IngredientEntity, RecipeEntity])],
  controllers: [IngredientsController],
  providers: [IngredientService],
  exports: [IngredientService],
})
export class IngredientsModule {}
