import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { RegisterDto } from './auth/register.dto';
import { UserEntity } from './users/user.entity';
import { LocalAuthGuard } from './auth/local-auth.gard';
import { JwtAuthGuard } from './auth/jwt-auth.gard';
import { Response as ResponseType } from 'express';
import { Request as RequestType } from 'express';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getData() {
    return this.authService.getData();
  }

  /**
   * Login a new user
   */
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(
    @Request() req: RequestType,
    @Res() res: ResponseType,
  ): Promise<Partial<UserEntity>> {
    const authToken = await this.authService.generateToken(req.user);
    this.authService.storeTokenInCookie(res, authToken.access_token);
    res.status(200).send(authToken.payload);
    return;
  }

  /**
   * Register a new user
   */
  @Post('register')
  register(@Body() body: RegisterDto): Promise<UserEntity> {
    return this.authService.register(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
