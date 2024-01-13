import bcrypt from 'bcrypt';
import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterDto } from './register.dto';
import { UserEntity } from '../users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  async register(body: RegisterDto): Promise<UserEntity> {
    // hash the password "Salt Rounds = 10"
    const passwordHashed = await bcrypt.hash(body.password, 10);

    const user = this.userRepository.create({
      givenName: body.givenName.trim(),
      familyName: body.familyName.trim(),
      email: body.email.toLowerCase().trim(),
      password: passwordHashed,
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
}
