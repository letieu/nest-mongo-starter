import {
  Controller,
  Get,
  Param,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import MongooseClassSerializerInterceptor from 'src/util/mongooseClassSerializer.interceptor';

import { User } from './schemas/user.schema';
import { UserService } from './user.service';

@Controller('users')
@UseInterceptors(MongooseClassSerializerInterceptor(User))
export class UserController {
  constructor(private readonly service: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async index() {
    return await this.service.findAll();
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.service.findOne(id);
  }
}
