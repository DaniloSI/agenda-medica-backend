import {
  ArrayMinSize,
  IsArray,
  IsDefined,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ProfessionalRegister } from '../schemas/professional.schema';
import { SignUpUserDto } from '../../dto/sign-up.dto';
import { Type } from 'class-transformer';

class ProfessionalRegisterDto {
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

export class SignUpProfessionalDto extends SignUpUserDto {
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => ProfessionalRegisterDto)
  readonly register: ProfessionalRegister;

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  readonly specialties: string[];
}
