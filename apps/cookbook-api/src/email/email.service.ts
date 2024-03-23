import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../users/user.entity';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private cookbookUrl = 'http://localhost:4200';

  constructor(
    private readonly configService: ConfigService,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  private transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    secure: true,
    auth: {
      user: this.configService.get<string>('EMAIL_USERNAME'),
      pass: this.configService.get<string>('EMAIL_API_KEY'),
    },
  });

  // ---------   SEND EMAIL VALIDATION  --------- //
  async sendEmailValidation(user: UserEntity): Promise<void> {
    try {
      const verificationUrl: string = `${this.cookbookUrl}/verify/${user.emailToken.token}`;

      await this.transporter.sendMail({
        from: this.configService.get<string>('EMAIL_USERNAME'),
        to: user.email,
        subject: 'Vérification de votre adresse e-mail',
        html: `
        <p>Bonjour ${user.givenName},</p>
        <p>Merci de vous être inscrit.</p>
        <p>Cliquez sur le lien ci-dessous pour valider votre adresse e-mail :</p>
        <p><a href="${this.cookbookUrl}/verify/${user.emailToken.token}">Valider mon adresse e-mail</a></p>
        <p>Sinon, copiez et collez ce lien dans la barre d'adresse de votre navigateur préféré.
         <div class="button-alt-url">${verificationUrl}</div></p>
        <p>Si vous n'avez pas créé de compte sur notre application, veuillez ignorer cet e-mail.</p>
        <p>Merci,</p>
        <p>L'équipe de CookBook</p>
      `,
      });
    } catch (error) {
      console.error(
        "Erreur lors de l'envoi de l'e-mail de validation :",
        error,
      );
    }
  }
}
