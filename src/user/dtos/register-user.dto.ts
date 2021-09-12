import { IsEmail, Length } from 'class-validator';

export class RegisterUserDto {
  @IsEmail()
  @Length(4, 30)
  email: string;

  @Length(4, 30)
  username: string;

  @Length(4, 30)
  password: string;
}
