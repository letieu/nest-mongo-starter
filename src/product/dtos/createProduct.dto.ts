import {
  IsArray,
  IsBoolean,
  IsMongoId,
  IsNumber,
  IsOptional,
  Length,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ID } from '../../global/interfaces/id.interface';

export class CreateProductDto {
  @Length(2, 50)
  title: string;

  @IsOptional()
  @Length(4, 30)
  description: string;

  @IsNumber()
  @Type(() => Number)
  price: number;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  activated = true;

  @IsOptional()
  @IsMongoId()
  category: ID;

  @IsOptional()
  @IsArray()
  tags: string[];

  @IsOptional()
  image: string;
}
