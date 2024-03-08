import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { User } from '../auth/user.decorator';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.gard';
import { UserRequest } from '@cookbook/models';

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
}
