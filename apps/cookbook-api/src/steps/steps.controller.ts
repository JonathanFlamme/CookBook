import {
  Body,
  Controller,
  Delete,
  Param,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';
import { StepService } from './step.service';
import { StepDto } from './step.dto';
import { StepEntity } from './step.entity';

@Controller()
export class StepsController {
  constructor(private readonly stepService: StepService) {}

  /**
   * Update steps
   */
  @Patch('recipes/:recipeId/steps')
  update(
    @Param('recipeId', ParseUUIDPipe) recipeId: string,
    @Body() body: StepDto[],
  ): Promise<StepEntity[]> {
    console.log('body', body);
    return this.stepService.update(recipeId, body);
  }

  /**
   * Delete a step
   */
  @Delete('recipes/:recipeId/steps/:stepId')
  async delete(
    @Param('recipeId', ParseUUIDPipe) recipeId: string,
    @Param('stepId', ParseUUIDPipe) stepId: string,
  ): Promise<void> {
    await this.stepService.delete(recipeId, stepId);
  }
}
