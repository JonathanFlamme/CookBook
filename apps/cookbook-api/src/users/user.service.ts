import { Injectable, NotFoundException } from '@nestjs/common';
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

  // ---------   VIEW PROFILE   --------- //
  async view(userId: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException("L'utilisateur n'a pas été trouvé");
    }

    return user;
  }

  // ---------   LIST ALL USERS  --------- //
  async list(): Promise<UserEntity[]> {
    const users = await this.userRepository.find();
    return users;
  }

  // ---------   UPDATE ROLE BY ADMIN   --------- //
  async updateRoleByAdmin(userId: string, role: UserRole): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException("L'utilisateur n'a pas été trouvé");
    }

    user.role = role;
    try {
      await this.userRepository.save(user);
    } catch (error) {
      throw new Error("Le rôle de l'utilisateur n'a pas été mis à jour");
    }
    return user;
  }

  /**
   * delete user
   */
  async delete(userId: string): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException("L'utilisateur n'a pas été trouvé");
    }
    try {
      await this.userRepository.delete({ id: userId });
    } catch (error) {
      throw new Error("L'utilisateur n'a pas été supprimé");
    }
  }
}
