import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { RegisterDto } from './auth/register.dto';
import { UserEntity } from './users/user.entity';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getData() {
    return this.authService.getData();
  }

  /**
   * Register a new user
   */
  @Post('register')
  register(@Body() body: RegisterDto): Promise<UserEntity> {
    return this.authService.register(body);
  }
}
