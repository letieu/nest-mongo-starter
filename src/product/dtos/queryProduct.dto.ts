import { QueryDto } from '../../global/dtos/query.dto';
import { ProductFilter } from '../interfaces/productFilter.interface';
import { IsBoolean, IsMongoId, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { ID } from '../../global/interfaces/id.interface';

export class QueryProductDto extends QueryDto implements ProductFilter {
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    return [true, 'enabled', 'true'].indexOf(value) > -1;
  })
  activated: boolean;

  @IsOptional()
  search: string;

  @IsOptional()
  @IsMongoId()
  category: ID;

  @IsOptional()
  tag: string;
}
