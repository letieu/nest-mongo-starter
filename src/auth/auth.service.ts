import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from 'src/user/dtos/register-user.dto';
import { LoginDto } from 'src/user/dtos/login-user.dto';
import { JwtPayload } from './interface/jwtPayload.interface';
import { User } from '../user/schemas/user.schema';
import { ResetToken } from './schemas/resetToken.schema';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { ResetPasswordDto } from '../user/dtos/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    @InjectModel(ResetToken)
    private readonly tokenModel: ReturnModelType<typeof ResetToken>,
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

  async resetRequest(email: string): Promise<string> {
    const user = await this.usersService.findOneByEmail(email);

    if (!user)
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    const token = await this.tokenModel.findOne({ userId: user.id });
    if (token) await token.deleteOne();
    const resetToken = randomBytes(32).toString('hex');
    const hash = await bcrypt.hash(resetToken, 10);

    await new this.tokenModel({
      userId: user.id,
      token: hash,
      createdAt: Date.now(),
    }).save();

    const link = `/passwordReset?token=${resetToken}&id=${user.id}`;
    return link;
  }

  async resetPassword(payload: ResetPasswordDto) {
    const token = await this.tokenModel.findOne({ userId: payload.userId });
    if (!token) {
      throw new HttpException(
        'Invalid or expired password reset token',
        HttpStatus.NOT_FOUND,
      );
    }
    const isValid = await bcrypt.compare(payload.token, token.token);
    if (!isValid) {
      throw new HttpException(
        'Invalid or expired password reset token',
        HttpStatus.NOT_FOUND,
      );
    }
    await this.usersService.update(payload.userId, {
      password: payload.password,
    });
    await token.deleteOne();
    return true;
  }
}
