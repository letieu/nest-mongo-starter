import { ID } from '../../global/interfaces/id.interface';

export interface ProductFilter {
  search?: string;
  activated?: boolean;
  category?: ID;
  tag?: string;
}
