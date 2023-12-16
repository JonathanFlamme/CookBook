import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeEntity } from './recipe.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RecipeEntity])],
  controllers: [],
  providers: [],
  exports: [],
})
export class RecipesModule {}
