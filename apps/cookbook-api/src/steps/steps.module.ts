import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StepEntity } from './step.entity';
import { StepService } from './step.service';
import { StepsController } from './steps.controller';
import { RecipeEntity } from '../recipes/recipe.entity';
import { StepsAdminController } from './steps-admin.controller';

@Module({
  imports: [TypeOrmModule.forFeature([StepEntity, RecipeEntity])],
  controllers: [StepsController, StepsAdminController],
  providers: [StepService],
  exports: [StepService],
})
export class StepsModule {}
