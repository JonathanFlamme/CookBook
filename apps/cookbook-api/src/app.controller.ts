import { Body, Controller, Post, UseGuards, Res } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { RegisterDto } from './auth/register.dto';
import { UserEntity } from './users/user.entity';
import { LocalAuthGuard } from './auth/local-auth.gard';
import { Response as ResponseType } from 'express';
import { User } from './auth/user.decorateur';
import { SanitizerPipe } from './common/sanitizer.pipe';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Login a new user
   */
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(
    @User() user: UserEntity,
    @Res() res: ResponseType,
  ): Promise<Partial<UserEntity>> {
    const authToken = await this.authService.generateToken(user);
    this.authService.storeTokenInCookie(res, authToken.access_token);
    res.status(200).send(authToken.payload);
    return;
  }

  /**
   * Register a new user
   */
  @Post('register')
  register(@Body(new SanitizerPipe()) body: RegisterDto): Promise<UserEntity> {
    return this.authService.register(body);
  }
}
