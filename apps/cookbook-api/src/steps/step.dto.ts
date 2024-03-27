import { IsInt, IsString } from 'class-validator';

export class StepDto {
  @IsString()
  description: string;

  @IsInt()
  sort: number;
}
