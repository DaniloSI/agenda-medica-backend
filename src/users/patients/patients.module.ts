import { Module } from '@nestjs/common';
import { PatientsController } from './patients.controller';
import { PatientsService } from './patients.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/user.schema';
import { Patient, PatientSchema } from './schemas/patient.schema';
import {
  Professional,
  ProfessionalSchema,
} from '../professionals/schemas/professional.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
        discriminators: [
          { name: Professional.name, schema: ProfessionalSchema },
          { name: Patient.name, schema: PatientSchema },
        ],
      },
    ]),
  ],
  controllers: [PatientsController],
  providers: [PatientsService],
})
export class PatientsModule {}
