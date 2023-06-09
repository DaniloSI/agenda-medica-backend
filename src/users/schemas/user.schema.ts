import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { hash } from 'bcrypt';

import { v4 as uuidv4 } from 'uuid';

@Schema({ discriminatorKey: 'type', versionKey: false })
export class User {
  @Prop({
    type: String,
    default: () => uuidv4(),
  })
  _id: string;

  @Prop({ type: String, required: true })
  givenName: string;

  @Prop({ type: String, required: true })
  familyName: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, required: true })
  phone: string;

  @Prop({ type: Boolean, required: true })
  acceptTerms: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next: (err?: Error) => void) {
  try {
    if (!this.isModified('password')) {
      return next();
    }

    this['password'] = await hash(this['password'], 10);
  } catch (error) {
    next(error);
  }
});
