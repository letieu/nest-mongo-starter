import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { Post, PostDocument } from './schemas/post.schema';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private readonly model: Model<PostDocument>,
  ) {}

  async findAll(): Promise<Post[]> {
    return await this.model.find().exec();
  }

  async findOne(id: string): Promise<Post> {
    return await this.model.findById(id).exec();
  }

  async create(createPostDto: CreatePostDto): Promise<Post> {
    return await new this.model({
      ...createPostDto,
      createdAt: new Date(),
    }).save();
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    return await this.model.findByIdAndUpdate(id, updatePostDto).exec();
  }

  async delete(id: string): Promise<Post> {
    return await this.model.findByIdAndDelete(id).exec();
  }
}
