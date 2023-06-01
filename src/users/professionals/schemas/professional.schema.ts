import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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

@Schema()
export class Professional {
  _id: string;
  givenName: string;
  familyName: string;
  email: string;
  password: string;
  phone: string;
  acceptTerms: boolean;

  @Prop({ type: Object, required: true })
  register: ProfessionalRegister;

  @Prop({ type: [String], required: true })
  specialties: string[];
}

export const ProfessionalSchema = SchemaFactory.createForClass(Professional);
