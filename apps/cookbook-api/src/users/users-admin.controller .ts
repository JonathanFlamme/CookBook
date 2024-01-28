import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.gard';

@Controller('admin')
export class UserAdminController {
  constructor(private readonly userService: UserService) {}

  /**
   * View profile
   */
  @UseGuards(JwtAuthGuard)
  @Get('users')
  list(): Promise<UserEntity[]> {
    return this.userService.list();
  }
}
