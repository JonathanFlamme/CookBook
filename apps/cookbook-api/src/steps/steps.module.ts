import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StepEntity } from './step.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StepEntity])],
  controllers: [],
  providers: [],
  exports: [],
})
export class StepsModule {}
