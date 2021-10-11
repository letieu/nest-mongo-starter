import { prop } from '@typegoose/typegoose';
import { BaseModel } from '../../global/base.model';
import { ID } from '../../global/interfaces/id.interface';
import { OrderStatus } from '../interfaces/orderStatus.interface';
import { User } from '../../user/schemas/user.schema';
import { OrderItem } from '../interfaces/orderItem.interface';

export class Order extends BaseModel {
  @prop()
  customerName: string;

  @prop()
  customerPhone: string;

  @prop()
  customerAddress: string;

  @prop({ ref: User })
  createdBy: ID;

  @prop()
  status: OrderStatus = OrderStatus.PENDING;

  @prop()
  total: number;

  @prop()
  items: OrderItem[];
}
