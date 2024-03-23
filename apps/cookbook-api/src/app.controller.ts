import {
  Body,
  Controller,
  Post,
  UseGuards,
  Res,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { RegisterDto } from './auth/register.dto';
import { UserEntity } from './users/user.entity';
import { LocalAuthGuard } from './auth/local-auth.gard';
import { Response as ResponseType } from 'express';
import { User } from './auth/user.decorator';
import { SanitizerPipe } from './common/sanitizer.pipe';
import { UserRequest } from '@cookbook/models';
import { JwtAuthGuard } from './auth/jwt-auth.gard';
import { PasswordResetDto } from './auth/password-reset.dto';

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
  ): Promise<UserRequest> {
    const authToken = await this.authService.generateJwtToken(user);
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

  /**
   * Logout a user
   */
  @UseGuards(JwtAuthGuard)
  @Post('auth/logout')
  logout(@Res() res: ResponseType): void {
    this.authService.clearTokenInCookie(res);
    res.status(200).send({ message: 'Logout' });
    return;
  }

  /**
   * Verify a user email
   */
  @Post('verify')
  @HttpCode(HttpStatus.NO_CONTENT)
  verify(@Body('token') token: string): Promise<void> {
    return this.authService.verifyEmail(token);
  }

  /**
   * verify reset token
   */
  @Post('verify-reset-token')
  @HttpCode(HttpStatus.NO_CONTENT)
  verifyResetToken(@Body('token') token: string): Promise<void> {
    return this.authService.verifyResetPasswordToken(token);
  }

  /**
   * Forgot password
   */
  @Post('forgot')
  @HttpCode(HttpStatus.NO_CONTENT)
  forgotPassword(@Body('email') email: string): Promise<void> {
    return this.authService.forgotPassword(email);
  }

  /**
   * Reset password
   */
  @Post('reset')
  @HttpCode(HttpStatus.NO_CONTENT)
  resetPassword(@Body() body: PasswordResetDto): Promise<void> {
    return this.authService.changePasswordWithToken(body);
  }
}
