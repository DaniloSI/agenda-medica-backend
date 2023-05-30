import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { Gender } from '../schemas/patient.schema';

export class SignUpPatientDto {
  @IsNotEmpty()
  @IsString()
  givenName: string;

  @IsNotEmpty()
  @IsString()
  familyName: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  password: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsBoolean()
  acceptTerms: boolean;

  @IsDateString()
  birthDate: string;

  @IsEnum(Gender)
  gender: Gender;
}
