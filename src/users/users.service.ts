import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { SignUpPatientDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { Patient } from './schemas/patient.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Patient.name)
    private readonly userModel: Model<Patient>,
    private readonly authService: AuthService,
  ) {}

  public async signUp(signUpPatientDto: SignUpPatientDto): Promise<Patient> {
    const user = new this.userModel(signUpPatientDto);

    if (await this.userModel.findOne({ email: signUpPatientDto.email })) {
      throw new UnauthorizedException('Usuário já cadastrado com este e-mail.');
    }

    return user.save();
  }

  private async findByEmail(email: string): Promise<Patient> {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new NotFoundException('E-mail not found.');
    }

    return user;
  }

  private async checkPassword(
    user: Patient,
    password: string,
  ): Promise<boolean> {
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new NotFoundException('Password not found.');
    }

    return match;
  }

  public async signIn(signInDto: SignInDto): Promise<{
    givenName: string;
    familyName: string;
    jwtToken: string;
    email: string;
  }> {
    const user = await this.findByEmail(signInDto.email);
    const match = await this.checkPassword(user, signInDto.password);

    if (!match) {
      throw new NotFoundException('Invalid credentials.');
    }

    const jwtToken = await this.authService.createAccessToken(user._id);

    return {
      givenName: user.givenName,
      familyName: user.familyName,
      jwtToken,
      email: user.email,
    };
  }

  public async findAll(): Promise<Patient[]> {
    return this.userModel.find();
  }
}
