import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRole } from '@cookbook/models';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  /**
   * View profile
   */
  async view(userId: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    return user;
  }

  /**
   * List users
   */
  async list(): Promise<UserEntity[]> {
    const users = await this.userRepository.find();
    return users;
  }

  /**
   * update Role user by Admin
   */
  async updateRoleByAdmin(userId: string, role: UserRole): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    user.role = role;

    await this.userRepository.save(user);

    return user;
  }

  /**
   * delete user
   */
  async delete(userId: string): Promise<void> {
    await this.userRepository.delete({ id: userId });
  }
}
