import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StepEntity } from './step.entity';
import { StepService } from './step.service';
import { StepsController } from './steps.controller';
import { RecipeEntity } from '../recipes/recipe.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StepEntity, RecipeEntity])],
  controllers: [StepsController],
  providers: [StepService],
  exports: [StepService],
})
export class StepsModule {}
