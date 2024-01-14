import bcrypt from 'bcrypt';
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './register.dto';
import { UserEntity } from '../users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginDto } from './login.dto';

@Injectable()
export class AuthService {
  constructor(
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
   * Login user
   */
  async login(body: LoginDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { email: body.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }

    // compare the password with the hashed password
    const isValid = await bcrypt.compare(body.password, user.password);
    if (!isValid) {
      throw new UnauthorizedException('Invalid password');
    }
    return user;
  }
}
