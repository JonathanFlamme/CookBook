import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.gard';
import { UserRole } from '@cookbook/models';

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

  /**
   * update Role user
   */
  @UseGuards(JwtAuthGuard)
  @Patch('users/:userId')
  updateRole(
    @Param('userId') userId: string,
    @Body() body: { role: UserRole },
  ): Promise<UserEntity> {
    return this.userService.updateRoleByAdmin(userId, body.role);
  }
}
