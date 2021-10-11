import { prop } from '@typegoose/typegoose';
import { BaseModel } from '../../global/base.model';

export class Category extends BaseModel {
  @prop()
  title: string;

  @prop()
  description: string;

  @prop()
  activated: boolean;
}
