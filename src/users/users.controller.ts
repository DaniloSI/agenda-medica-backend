import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { SignUpPatientDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from './schemas/user.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('sign-up-patient')
  @HttpCode(HttpStatus.CREATED)
  public async signUpPatient(
    @Body() signUpPatientDto: SignUpPatientDto,
  ): Promise<User> {
    return this.usersService.signUp(signUpPatientDto);
  }

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  public async signIn(@Body() signInDto: SignInDto): Promise<{
    givenName: string;
    familyName: string;
    email: string;
    jwtToken: string;
  }> {
    return this.usersService.signIn(signInDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  public async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
}
