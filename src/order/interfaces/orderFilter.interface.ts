import { ID } from '../../global/interfaces/id.interface';
import { OrderStatus } from './orderStatus.interface';

export interface ProductFilter {
  customerName?: string;
  customerPhone?: string;
  createdBy?: ID;
  status?: OrderStatus;
}
