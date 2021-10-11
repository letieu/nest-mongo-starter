import { QueryDto } from '../../global/dtos/query.dto';
import { ProductFilter } from '../interfaces/orderFilter.interface';
import { IsEnum, IsMongoId, IsOptional } from 'class-validator';
import { OrderStatus } from '../interfaces/orderStatus.interface';
import { ID } from '../../global/interfaces/id.interface';

export class QueryOrderDto extends QueryDto implements ProductFilter {
  @IsOptional()
  customerPhone: string;

  @IsOptional()
  customerName: string;

  @IsOptional()
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @IsOptional()
  @IsMongoId()
  createdBy: ID;
}
