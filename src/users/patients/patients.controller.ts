import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { SignUpPatientDto } from './dto/sign-up.dto';
import { Patient } from './schemas/patient.schema';

@Controller('users/patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  public async signUp(
    @Body() signUpPatientDto: SignUpPatientDto,
  ): Promise<Patient> {
    return this.patientsService.signUp(signUpPatientDto);
  }
}
