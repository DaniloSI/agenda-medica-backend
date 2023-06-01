import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignUpPatientDto } from './dto/sign-up.dto';
import { Patient } from './schemas/patient.schema';

@Injectable()
export class PatientsService {
  constructor(
    @InjectModel(Patient.name)
    private readonly userModel: Model<Patient>,
  ) {}

  public async signUp(signUpPatientDto: SignUpPatientDto): Promise<Patient> {
    const user = new this.userModel(signUpPatientDto);

    if (await this.userModel.findOne({ email: signUpPatientDto.email })) {
      throw new UnauthorizedException('Usuário já cadastrado com este e-mail.');
    }

    return user.save();
  }

  public async findAll(): Promise<Patient[]> {
    return this.userModel.find();
  }
}
