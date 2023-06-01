import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum Gender {
  MALE = 'M',
  FEMALE = 'F',
  OTHER = 'O',
}

@Schema()
export class Patient {
  _id: string;
  givenName: string;
  familyName: string;
  email: string;
  password: string;
  phone: string;
  acceptTerms: boolean;

  @Prop({ type: String, required: true })
  birthDate: Date;

  @Prop({ type: String, required: true })
  gender: Gender;
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
