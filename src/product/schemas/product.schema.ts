import { prop, Ref } from '@typegoose/typegoose';
import { BaseModel } from '../../global/base.model';
import { Category } from '../../category/schemas/category.schema';
import { ID } from '../../global/interfaces/id.interface';

export class Product extends BaseModel {
  @prop()
  title: string;

  @prop()
  description: string;

  @prop()
  activated: boolean;

  @prop({ ref: Category })
  category: ID;

  @prop()
  tags: string[];
}
