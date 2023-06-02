import {
  ArrayMinSize,
  IsArray,
  IsDefined,
  IsNotEmptyObject,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ProfessionalRegister } from '../schemas/professional.schema';
import { SignUpUserDto } from '../../dto/sign-up.dto';
import { Type } from 'class-transformer';
import { Address } from 'cluster';
import { ProfessionalRegisterDto } from './professional-register.dto';
import { AddressDto } from './address.dto';

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

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => AddressDto)
  address: Address;
}
