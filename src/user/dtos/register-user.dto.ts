import { IsEnum, IsOptional, Length } from 'class-validator';
import { UserStatusEnum } from '../interfaces/userStatus.enum';

export class RegisterUserDto {
  @Length(4, 30)
  username: string;

  @Length(4, 30)
  password: string;

  @IsOptional()
  @Length(4, 30)
  title: string;

  @IsOptional()
  @IsEnum(UserStatusEnum)
  status: UserStatusEnum = UserStatusEnum.ACTIVE;
}
