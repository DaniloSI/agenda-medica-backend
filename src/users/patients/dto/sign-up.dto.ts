import { IsDateString, IsEnum } from 'class-validator';
import { Gender } from '../schemas/patient.schema';
import { SignUpUserDto } from '../../dto/sign-up.dto';

export class SignUpPatientDto extends SignUpUserDto {
  @IsDateString()
  birthDate: string;

  @IsEnum(Gender)
  gender: Gender;
}
