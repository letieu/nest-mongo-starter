import { prop } from '@typegoose/typegoose';
import { Exclude } from 'class-transformer';
import { BaseModel } from '../../global/base.model';
import { UserStatusEnum } from '../interfaces/userStatus.enum';

export class User extends BaseModel {
  @prop()
  username: string;

  @prop()
  @Exclude()
  password: string;

  @prop()
  email: string;

  @prop()
  title: string;

  @prop()
  status: UserStatusEnum;
}
