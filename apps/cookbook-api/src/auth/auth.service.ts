import bcrypt from 'bcrypt';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RegisterDto } from './register.dto';
import { UserEntity } from '../users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Response as ResponseType } from 'express';
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

  // ---------   CREATE A NEW USER  --------- //
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
        throw new ConflictException("L'utilisateur existe déjà");
      }
    }
    return null;
  }

  // ---------   GENERATE TOKEN  --------- //
  async generateToken(user: UserEntity) {
    if (!user) {
      throw new NotFoundException("L'utilisateur n'a pas été trouvé");
    }

    const payload = { id: user.id, role: user.role };

    return {
      payload,
      access_token: this.jwtService.sign(payload),
    };
  }

  // ---------   VALIDATE USER  --------- //
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

  // ---------   STORE TOKEN IN COOKIE  --------- //
  public storeTokenInCookie(res: ResponseType, authToken: string) {
    res.cookie('access_token', authToken, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
  }

  // ---------   CLEAR TOKEN IN COOKIE  --------- //
  public clearTokenInCookie(res: ResponseType) {
    res.cookie('access_token', '', {
      expires: new Date(0),
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
  }
}
