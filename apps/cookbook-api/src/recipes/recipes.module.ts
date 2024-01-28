import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeEntity } from './recipe.entity';
import { RecipeController } from './recipes.controller';
import { RecipeService } from './recipe.service';
import { RecipeAdminController } from './recipes-admin.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RecipeEntity])],
  controllers: [RecipeController, RecipeAdminController],
  providers: [RecipeService],
  exports: [RecipeService],
})
export class RecipesModule {}
