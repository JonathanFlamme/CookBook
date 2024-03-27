import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRole } from '@cookbook/models';
import { ChangePasswordDto } from './change-password.dto';
import bcrypt from 'bcrypt';
import { EditProfiledDto } from './edit-profile.dto';

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

  // ---------   CHANGE PASSWORD   --------- //
  async changePassword(userId: string, body: ChangePasswordDto): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new Error("L'utilisateur n'a pas été trouvé");
    }

    // check is currentPassword is valid
    const isValid = await bcrypt.compare(body.currentPassword, user.password);
    if (!isValid) {
      throw new Error("Le mot de passe actuel n'est pas valide");
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    user.password = hashedPassword;

    try {
      await this.userRepository.save(user);
    } catch (error) {
      throw new Error("Le mot de passe n'a pas été mis à jour");
    }
  }

  // ---------   EDIT PROFILE   --------- //
  async edit(userId: string, body: EditProfiledDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new BadRequestException("L'utilisateur n'a pas été trouvé");
    }

    user.familyName = body.familyName;
    user.givenName = body.givenName;
    user.email = body.email;

    try {
      await this.userRepository.save(user);
    } catch (error) {
      throw new Error("Le profil n'a pas été mis à jour");
    }

    return user;
  }
}
