import {
  Body,
  Controller,
  Delete,
  Param,
  ParseUUIDPipe,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { StepService } from './step.service';
import { StepDto } from './step.dto';
import { StepEntity } from './step.entity';
import { Request as RequestType } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.gard';

@Controller()
export class StepsController {
  constructor(private readonly stepService: StepService) {}

  /**
   * Update steps
   */
  @UseGuards(JwtAuthGuard)
  @Patch('recipes/:recipeId/steps')
  update(
    @Request() req: RequestType,
    @Param('recipeId', ParseUUIDPipe) recipeId: string,
    @Body() body: StepDto[],
  ): Promise<StepEntity[]> {
    console.log('body', body);
    return this.stepService.update(req, recipeId, body);
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
