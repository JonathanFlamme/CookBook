import bcrypt from 'bcrypt';
import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterDto } from './register.dto';
import { UserEntity } from '../users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Response as ResponseType } from 'express';
import { UserRequest } from '@cookbook/models';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  /**
   *  Create new user
   */
  async register(body: RegisterDto): Promise<UserEntity> {
    // hash the password "Salt Rounds = 10"
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(body.password, saltRounds);

    const user = this.userRepository.create({
      givenName: body.givenName.trim(),
      familyName: body.familyName.trim(),
      email: body.email.toLowerCase().trim(),
      password: hashedPassword,
    });

    try {
      await this.userRepository.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Identifier already registered');
      }
    }
    return null;
  }

  /**
   * Generate Token
   */
  async generateToken(user: UserRequest) {
    const payload = { id: user.userId, role: user.role };

    return {
      payload,
      access_token: this.jwtService.sign(payload),
    };
  }
  /**
   * Verify validate user
   */
  async validateUser(email: string, password: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    const isValid = await bcrypt.compare(password, user.password);
    if (user && isValid) {
      return user;
    }
    return null;
  }

  // Store Token in Cookie
  public storeTokenInCookie(res: ResponseType, authToken: string) {
    res.cookie('access_token', authToken, {
      maxAge: 1000 * 60 * 60 * 4,
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
  }
}
