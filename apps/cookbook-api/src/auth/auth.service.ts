import bcrypt from 'bcrypt';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RegisterDto } from './register.dto';
import { UserEntity } from '../users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JsonContains, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Response as ResponseType } from 'express';
import { randomBytes } from 'crypto';
import { promisify } from 'util';
import { DateTime } from 'luxon';
import { EmailService } from '../email/email.service';
import { UserService } from '../users/user.service';
import { PasswordResetDto } from './password-reset.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
    private readonly userService: UserService,

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

    const emailToken = await this.generateToken();

    const user = this.userRepository.create({
      givenName: body.givenName.trim(),
      familyName: body.familyName.trim(),
      email: body.email.toLowerCase().trim(),
      password: hashedPassword,
      emailToken,
    });

    try {
      await this.userRepository.save(user);

      // send email validation
      await this.emailService.sendEmailValidation(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException("L'utilisateur existe déjà");
      }
    }
    return null;
  }

  // ---------   GENERATE TOKEN  --------- //
  async generateToken(): Promise<{ token: string; expiredAt: Date }> {
    const randomBytesAsync = promisify(randomBytes);
    const token = (await randomBytesAsync(16)).toString('hex');

    return {
      token,
      expiredAt: DateTime.now().plus({ days: 1 }).toJSDate(),
    };
  }

  // ---------   GENERATE JWT TOKEN  --------- //
  async generateJwtToken(user: UserEntity) {
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

  // ---------   VERIFY EMAIL  --------- //
  async verifyEmail(token: string): Promise<void> {
    const user = await this.userRepository.findOne({
      where: {
        emailToken: JsonContains({ token: token }),
      },
    });

    if (!user) {
      throw new BadRequestException('Le lien de vérification est invalide');
    }

    if (user.emailToken.expiredAt < new Date()) {
      throw new BadRequestException('Le lien de vérification a expiré');
    }

    user.verifiedAt = new Date();
    user.emailToken.token = null;
    user.emailToken.expiredAt = null;
    try {
      this.userRepository.save(user);
    } catch (error) {
      throw new Error("Erreur lors de la validation de l'e-mail");
    }
  }

  // ---------   FORGOT PASSWORD  --------- //
  async forgotPassword(email: string): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new BadRequestException("L'utilisateur n'a pas été trouvé");
    }

    user.passwordToken = await this.generateToken();

    try {
      await this.userRepository.save(user);
      await this.emailService.sendForgotPassword(user);
    } catch (error) {
      throw new BadRequestException("Erreur lors de l'envoi de l'e-mail");
    }
  }

  // --------- VERIFY RESET PASSWORD TOKEN --------- //
  async verifyResetPasswordToken(token: string): Promise<void> {
    const user = await this.userRepository.findOne({
      where: {
        passwordToken: JsonContains({ token }),
      },
    });

    if (!user) {
      throw new BadRequestException('Le lien de vérification est invalide');
    }

    if (user.passwordToken.expiredAt < new Date()) {
      throw new BadRequestException('Le lien de vérification a expiré');
    }
  }

  // --------- CHANGE PASSWORD WITH TOKEN --------- //
  async changePasswordWithToken(body: PasswordResetDto): Promise<void> {
    const user = await this.userRepository.findOne({
      where: {
        passwordToken: JsonContains({ token: body.token }),
      },
    });
    if (!user) {
      throw new NotFoundException("L'utilisateur n'a pas été trouvé");
    }

    if (user.passwordToken.expiredAt < new Date()) {
      throw new BadRequestException('Le lien de vérification a expiré');
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    user.password = hashedPassword;
    user.passwordToken.token = null;
    user.passwordToken.expiredAt = null;

    try {
      await this.userRepository.save(user);
    } catch (error) {
      throw new Error("Le mot de passe n'a pas été mis à jour");
    }
  }
}
