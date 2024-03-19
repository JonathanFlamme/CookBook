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
import { UserRole } from '@cookbook/models';
import { Auth } from '../auth/auth.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { SanitizerStepPipe } from '../common/sanitizer-step.pipe';

@Controller('admin')
export class StepsAdminController {
  constructor(private readonly stepService: StepService) {}

  /**
   * Update steps
   */
  @Auth(UserRole.Admin)
  @UseGuards(JwtAuthGuard, AuthGuard)
  @Patch('users/:userId/recipes/:recipeId/steps')
  update(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('recipeId', ParseUUIDPipe) recipeId: string,
    @Body(new SanitizerStepPipe()) body: StepDto[],
  ): Promise<StepEntity[]> {
    return this.stepService.update(userId, recipeId, body);
  }

  /**
   * Delete a step
   */
  @Auth(UserRole.Admin)
  @UseGuards(JwtAuthGuard, AuthGuard)
  @Delete('users/:userId/recipes/:recipeId/steps/:stepId')
  async delete(
    @Param('recipeId', ParseUUIDPipe) recipeId: string,
    @Param('stepId', ParseUUIDPipe) stepId: string,
  ): Promise<void> {
    await this.stepService.delete(recipeId, stepId);
  }
}
