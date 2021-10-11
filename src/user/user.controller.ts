import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { QueryUserDto } from './dtos/query-user.dto';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  async index(@Query() query: QueryUserDto) {
    return await this.service.findAll(query);
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.service.findOne(id);
  }
}
