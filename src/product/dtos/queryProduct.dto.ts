import { QueryDto } from '../../global/dtos/query.dto';
import { ProductFilter } from '../interfaces/productFilter.interface';
import { IsBoolean, IsMongoId, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ID } from '../../global/interfaces/id.interface';

export class QueryProductDto extends QueryDto implements ProductFilter {
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  activated: boolean;

  @IsOptional()
  search: string;

  @IsOptional()
  @IsMongoId()
  category: ID;

  @IsOptional()
  tag: string;
}
