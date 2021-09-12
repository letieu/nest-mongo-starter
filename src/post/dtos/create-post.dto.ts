import { BasePostDto } from './base-post.dto';
import { IsNotEmpty } from "class-validator";

export class CreatePostDto extends BasePostDto {
  @IsNotEmpty()
  title: string;
  description: string;
}
