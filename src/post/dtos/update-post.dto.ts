import { IsNotEmpty } from 'class-validator';
import { BasePostDto } from './base-post.dto';

export class UpdatePostDto extends BasePostDto {
  @IsNotEmpty()
  completedAt: Date;
}
