import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterUserDto } from './dtos/register-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly model: Model<UserDocument>,
  ) {}

  async findAll(): Promise<UserDocument[]> {
    return await this.model.find().exec();
  }

  async findOne(id: string): Promise<UserDocument> {
    return await this.model.findById(id).exec();
  }

  async findOneByUserOrEmail(
    username: string,
  ): Promise<UserDocument | undefined> {
    return await this.model
      .findOne({
        $or: [{ username: username }, { email: username }],
      })
      .exec();
  }

  async create(registerUser: RegisterUserDto): Promise<UserDocument> {
    const user = await this.model.findOne({
      $or: [{ email: registerUser.email }, { username: registerUser.username }],
    });

    if (user)
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);

    const newUser = new this.model({
      ...registerUser,
      createdAt: new Date(),
    });

    newUser.password = await bcrypt.hash(registerUser.password, 10);

    return await newUser.save();
  }
}
