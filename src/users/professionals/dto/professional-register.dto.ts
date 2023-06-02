import { IsNotEmpty, IsString } from 'class-validator';

export class ProfessionalRegisterDto {
  @IsString()
  @IsNotEmpty()
  readonly regulator: string;

  @IsString()
  @IsNotEmpty()
  readonly code: string;

  @IsString()
  @IsNotEmpty()
  readonly uf: string;
}
