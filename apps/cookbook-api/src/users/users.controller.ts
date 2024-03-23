import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { User } from '../auth/user.decorator';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.gard';
import { UserRequest } from '@cookbook/models';
import { ChangePasswordDto } from './change-password.dto';
import { SanitizerPipe } from '../common/sanitizer.pipe';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * View profile
   */
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  view(@User() user: UserRequest): Promise<UserEntity> {
    return this.userService.view(user.userId);
  }

  /**
   * Change password
   */
  @UseGuards(JwtAuthGuard)
  @Post('profile/password')
  changePassword(
    @User() user: UserRequest,
    @Body(new SanitizerPipe()) body: ChangePasswordDto,
  ): Promise<void> {
    return this.userService.changePassword(user.userId, body);
  }
}
