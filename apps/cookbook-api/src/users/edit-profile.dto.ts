import { IsString } from 'class-validator';

export class EditProfiledDto {
  @IsString()
  givenName: string;

  @IsString()
  familyName: string;

  @IsString()
  email: string;
}
