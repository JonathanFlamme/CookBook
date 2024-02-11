import {
  Body,
  Controller,
  Delete,
  Param,
  ParseUUIDPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { StepService } from './step.service';
import { StepDto } from './step.dto';
import { StepEntity } from './step.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.gard';
import { User } from '../auth/user.decorateur';
import { SanitizerPipe } from '../common/sanitizer.pipe';
import { UserRequest } from '@cookbook/models';

@Controller()
export class StepsController {
  constructor(private readonly stepService: StepService) {}

  /**
   * Update steps
   */
  @UseGuards(JwtAuthGuard)
  @Patch('recipes/:recipeId/steps')
  update(
    @User() user: UserRequest,
    @Param('recipeId', ParseUUIDPipe) recipeId: string,
    @Body(new SanitizerPipe()) body: StepDto[],
  ): Promise<StepEntity[]> {
    return this.stepService.update(user.userId, recipeId, body);
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
