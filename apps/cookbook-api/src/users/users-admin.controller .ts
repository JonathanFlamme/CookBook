import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.gard';
import { UserRole } from '@cookbook/models';
import { Auth } from '../auth/auth.decorator';
import { AuthGuard } from '../auth/auth.guard';
@Controller('admin')
export class UserAdminController {
  constructor(private readonly userService: UserService) {}

  /**
   * View profile
   */
  @Auth(UserRole.Admin)
  @UseGuards(JwtAuthGuard, AuthGuard)
  @Get('users')
  list(): Promise<UserEntity[]> {
    return this.userService.list();
  }

  /**
   * update Role user
   */
  @Auth(UserRole.Admin)
  @UseGuards(JwtAuthGuard, AuthGuard)
  @Patch('users/:userId')
  updateRole(
    @Param('userId') userId: string,
    @Body() body: { role: UserRole },
  ): Promise<UserEntity> {
    return this.userService.updateRoleByAdmin(userId, body.role);
  }

  /**
   * delete user
   */
  @Auth(UserRole.Admin)
  @UseGuards(JwtAuthGuard, AuthGuard)
  @UseGuards(JwtAuthGuard, AuthGuard)
  @Delete('users/:userId')
  delete(@Param('userId') userId: string): Promise<void> {
    return this.userService.delete(userId);
  }
}
