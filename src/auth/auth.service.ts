import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDocument } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from 'src/user/dtos/register-user.dto';
import { LoginDto } from 'src/user/dtos/login-user.dto';
import { JwtPayload } from './interface/jwtPayload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async credentialByPassword(
    username: string,
    password: string,
  ): Promise<UserDocument> {
    const user = await this.usersService.findOneByUserOrEmail(username);
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
    const user = await this.usersService.findOneByUserOrEmail(
      loginDto.username,
    );

    const payload: JwtPayload = { username: user.username, _id: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerUser: RegisterUserDto) {
    const user = this.usersService.create(registerUser);
    return user;
  }

  async getUserFromJwtPayload({ _id }: JwtPayload) {
    const user = await this.usersService.findOne(_id);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return user;
  }
}
