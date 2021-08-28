import { BasePostDto } from './base-post.dto';

export class UpdatePostDto extends BasePostDto {
  completedAt: Date;
}
