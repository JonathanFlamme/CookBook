import { IsString } from 'class-validator';

export class EditProfiledDto {
  @IsString()
  userName: string;

  @IsString()
  givenName: string;

  @IsString()
  familyName: string;

  @IsString()
  email: string;
}
