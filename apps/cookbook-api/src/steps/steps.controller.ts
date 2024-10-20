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
import { User } from '../auth/user.decorator';
import { UserRequest, UserRole } from '@cookbook/models';
import { Auth } from '../auth/auth.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { SanitizerStepPipe } from '../common/sanitizer-step.pipe';

@Controller()
export class StepsController {
  constructor(private readonly stepService: StepService) {}

  /**
   * Update steps
   */
  @Auth(UserRole.User)
  @UseGuards(JwtAuthGuard, AuthGuard)
  @Patch('recipes/:slug/steps')
  update(
    @User() user: UserRequest,
    @Param('slug') slug: string,
    @Body(new SanitizerStepPipe()) body: StepDto[],
  ): Promise<StepEntity[]> {
    return this.stepService.update(user.userId, slug, body);
  }

  /**
   * Delete a step
   */
  @Auth(UserRole.User)
  @UseGuards(JwtAuthGuard, AuthGuard)
  @Delete('recipes/:slug/steps/:stepId')
  async delete(
    @User() user: UserRequest,
    @Param('slug') slug: string,
    @Param('stepId', ParseUUIDPipe) stepId: string,
  ): Promise<void> {
    await this.stepService.delete(user.userId, slug, stepId);
  }
}
