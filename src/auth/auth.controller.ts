import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RegisterUserDto } from 'src/user/dtos/register-user.dto';
import { LoginDto } from 'src/user/dtos/login-user.dto';
import { User } from 'src/user/schemas/user.schema';
import MongooseClassSerializerInterceptor from 'src/util/mongooseClassSerializer.interceptor';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local.guard';
import { JwtAuthGuard } from './guard/jwt.guard';
import { JwtPayload } from './interface/jwtPayload.interface';

@Controller('auth')
@UseInterceptors(MongooseClassSerializerInterceptor(User))
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
  async me(@Request() req: any) {
    const jwtPayload: JwtPayload = req.user;
    return await this.service.getUserFromJwtPayload(jwtPayload);
  }
}
