import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignUpProfessionalDto } from './dto/sign-up.dto';
import { Professional } from './schemas/professional.schema';
import { ProfessionalListDto } from './dto/list.dto';

@Injectable()
export class ProfessionalsService {
  constructor(
    @InjectModel(Professional.name)
    private readonly userModel: Model<Professional>,
  ) {}

  public async signUp(
    signUpProfessionalDto: SignUpProfessionalDto,
  ): Promise<Professional> {
    const user = new this.userModel(signUpProfessionalDto);

    if (await this.userModel.findOne({ email: signUpProfessionalDto.email })) {
      throw new UnauthorizedException('Usuário já cadastrado com este e-mail.');
    }

    return user.save();
  }

  public async findAll(specialty: string): Promise<ProfessionalListDto[]> {
    const professionals = (
      await this.userModel.find({ specialties: specialty })
    ).map((p) => ({
      givenName: p.givenName,
      familyName: p.familyName,
      email: p.email,
      phone: p.phone,
      specialties: p.specialties,
    }));

    return professionals;
  }
}
