import { prop } from '@typegoose/typegoose';
import { BaseModel } from '../../global/base.model';

export class Category extends BaseModel {
  @prop()
  title: string;

  @prop()
  description: string;

  @prop({ unique: true })
  activated: boolean;
}
