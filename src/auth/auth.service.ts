import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from 'src/user/dtos/register-user.dto';
import { LoginDto } from 'src/user/dtos/login-user.dto';
import { JwtPayload } from './interface/jwtPayload.interface';
import { User } from '../user/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async credentialByPassword(
    username: string,
    password: string,
  ): Promise<User> {
    const user = await this.usersService.findOneByUsername(username);
    if (!user)
      throw new HttpException(
        'User not found, please register',
        HttpStatus.NOT_FOUND,
      );

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      throw new HttpException(
        'password is not correct',
        HttpStatus.UNAUTHORIZED,
      );

    return user;
  }

  async genToken(loginDto: LoginDto) {
    const user = await this.usersService.findOneByUsername(loginDto.username);

    const payload: JwtPayload = { username: user.username, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerUser: RegisterUserDto) {
    return this.usersService.create(registerUser);
  }

  async getUserFromJwtPayload({ id }: JwtPayload) {
    const user = await this.usersService.findOne(id);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return user;
  }
}
