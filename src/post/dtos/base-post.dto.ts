import { IsNotEmpty } from 'class-validator';

export class BasePostDto {
  title: string;
  description: string;
}
