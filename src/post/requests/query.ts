import { IsNumberString } from 'class-validator';

export class FilterPostQuery {
  @IsNumberString()
  id: number;
}
