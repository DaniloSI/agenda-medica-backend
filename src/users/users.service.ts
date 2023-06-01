import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly authService: AuthService,
  ) {}

  private async findByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new NotFoundException('E-mail not found.');
    }

    return user;
  }

  private async checkPassword(user: User, password: string): Promise<boolean> {
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

  public async findAll(): Promise<User[]> {
    return this.userModel.find();
  }
}
