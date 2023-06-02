import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ProfessionalsService } from './professionals.service';
import { SignUpProfessionalDto } from './dto/sign-up.dto';
import { Professional } from './schemas/professional.schema';
import { ProfessionalListDto } from './dto/list.dto';
import MongooseClassSerializerInterceptor from 'src/mongoose.interceptor';

@Controller('users/professionals')
export class ProfessionalsController {
  constructor(private readonly professionalsService: ProfessionalsService) {}

  @UseInterceptors(MongooseClassSerializerInterceptor(Professional))
  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  public async signUp(
    @Body() signUpProfessionalDto: SignUpProfessionalDto,
  ): Promise<Professional> {
    return this.professionalsService.signUp(signUpProfessionalDto);
  }

  @Get()
  @HttpCode(HttpStatus.CREATED)
  public async findAll(
    @Query('specialty') specialty: string,
  ): Promise<ProfessionalListDto[]> {
    return this.professionalsService.findAll(specialty);
  }
}
