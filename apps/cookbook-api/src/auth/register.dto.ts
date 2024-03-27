import { IsString } from 'class-validator';

export class RegisterDto {
  @IsString()
  givenName: string;

  @IsString()
  familyName: string;

  @IsString()
  email: string;

  @IsString()
  password: string;
}
