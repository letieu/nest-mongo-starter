import { QueryDto } from '../../global/dtos/query.dto';
import { CategoryFilter } from '../interfaces/categoryFilter.interface';
import { IsBoolean, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class QueryCategoryDto extends QueryDto implements CategoryFilter {
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  activated: boolean;

  @IsOptional()
  search: string;
}
