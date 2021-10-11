import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { RegisterUserDto } from 'src/user/dtos/register-user.dto';
import { LoginDto } from 'src/user/dtos/login-user.dto';
import { ResetRequestDto } from 'src/user/dtos/reset-request.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local.guard';
import { JwtAuthGuard } from './guard/jwt.guard';
import { JwtPayload } from './interface/jwtPayload.interface';
import { Auth } from './decorator/auth.decorator';
import { ResetPasswordDto } from '../user/dtos/reset-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('register')
  async register(@Body() registerUser: RegisterUserDto) {
    return await this.service.register(registerUser);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.service.genToken(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('me')
  async me(@Auth() auth: JwtPayload) {
    return await this.service.getUserFromJwtPayload(auth);
  }

  @Post('reset_request')
  async requestReset(@Body() payload: ResetRequestDto) {
    return await this.service.resetRequest(payload.email);
  }

  @Post('reset_password')
  async resetPassword(@Body() payload: ResetPasswordDto) {
    await this.service.resetPassword(payload);
    return 'Password is changed';
  }
}
