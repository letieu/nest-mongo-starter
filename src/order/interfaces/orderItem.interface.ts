import { ID } from '../../global/interfaces/id.interface';

export interface OrderItem {
  product: ID;
  quantity: number;
  total: number;
}
