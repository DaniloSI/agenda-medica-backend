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
import { SignUpDto } from './dto/sign-up.dto';
import { User } from './models/user.model';
import { SignInDto } from './dto/sign-in.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  public async signUp(@Body() signUpDto: SignUpDto): Promise<User> {
    return this.usersService.signUp(signUpDto);
  }

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  public async signIn(@Body() signInDto: SignInDto): Promise<{
    name: string;
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
