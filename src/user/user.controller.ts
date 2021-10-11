import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { QueryUserDto } from './dtos/query-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { ID } from '../global/interfaces/id.interface';
import { ParseIdPipe } from '../global/pipes/parseId.pipe';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  async index(@Query() query: QueryUserDto) {
    return await this.service.findAll(query);
  }

  @Get(':id')
  async find(@Param('id', ParseIdPipe) id: ID) {
    return await this.service.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIdPipe) id: ID) {
    return await this.service.remove(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIdPipe) id: ID,
    @Body() payload: UpdateUserDto,
  ) {
    return await this.service.update(id, payload);
  }
}
