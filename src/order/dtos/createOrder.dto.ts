import {
  IsArray,
  IsEnum,
  IsOptional,
  Length,
} from 'class-validator';
import { OrderStatus } from '../interfaces/orderStatus.interface';
import { OrderItem } from '../interfaces/orderItem.interface';

export class CreateOrderDto {
  @Length(2, 50)
  customerName: string;

  @Length(5, 15)
  customerPhone: string;

  @Length(2, 200)
  customerAddress: string;

  @IsArray()
  items: OrderItem[];

  @IsOptional()
  @IsEnum(OrderStatus)
  status = OrderStatus.PENDING;
}
