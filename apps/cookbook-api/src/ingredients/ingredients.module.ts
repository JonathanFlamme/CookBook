import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngredientEntity } from './ingredient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IngredientEntity])],
  controllers: [],
  providers: [],
  exports: [],
})
export class IngredientsModule {}
