import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dtos/register-user.dto';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { QueryUserDto } from './dtos/query-user.dto';
import { PaginateResponse } from '../global/interfaces/paginate.interface';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly model: ReturnModelType<typeof User>,
  ) {}

  async findAll(query: QueryUserDto): Promise<PaginateResponse<User>> {
    const findQuery = this.model.find();
    if (query.search) {
      findQuery.or([
        { username: { $regex: '.*' + query.search + '.*', $options: 'i' } },
        { title: { $regex: '.*' + query.search + '.*', $options: 'i' } },
      ]);
    }
    const count = await this.model.find().merge(findQuery).countDocuments();
    findQuery
      .sort({ [query.sortBy]: query.sortType ?? 'desc' })
      .skip(query.page * query.size)
      .limit(query.size);

    return {
      items: await findQuery.exec(),
      paginate: {
        page: query.page,
        size: query.size,
        count,
      },
    };
  }

  async findOne(id: string): Promise<User> {
    return await this.model.findById(id).exec();
  }

  async findOneByUsername(username: string): Promise<User | undefined> {
    return await this.model.findOne({ username }).exec();
  }

  async create(registerUser: RegisterUserDto): Promise<User> {
    const user = await this.model.findOne({ username: registerUser.username });

    if (user)
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);

    const newUser = new this.model(registerUser);
    newUser.password = await bcrypt.hash(registerUser.password, 10);

    return await newUser.save();
  }

  async remove(id: string): Promise<User> {
    return this.model.findByIdAndRemove(id);
  }

  async update(id: string, payload: UpdateUserDto) {
    return this.model.findByIdAndUpdate(id, payload, { new: true });
  }
}
