import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../users/user.entity';
import { EmailService } from './email.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailsModule {}
