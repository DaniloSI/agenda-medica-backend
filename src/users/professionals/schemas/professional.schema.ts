import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';

export enum Gender {
  MALE = 'M',
  FEMALE = 'F',
  OTHER = 'O',
}

export interface ProfessionalRegister {
  regulator: string;
  code: string;
  uf: string;
}

export interface Address {
  state: string;
  city: string;
  neighborhood: string;
  streetAddress: string;
  number: string;
  zipCode: string;
}

@Schema()
export class Professional {
  @Exclude()
  _id: string;
  givenName: string;
  familyName: string;
  email: string;

  @Exclude()
  password: string;

  phone: string;
  acceptTerms: boolean;

  @Prop({ type: Object, required: true })
  register: ProfessionalRegister;

  @Prop({ type: [String], required: true })
  specialties: string[];

  @Prop({ type: Object, required: true })
  address: Address;
}

export const ProfessionalSchema = SchemaFactory.createForClass(Professional);
