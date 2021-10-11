import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { QueryOrderDto } from './dtos/queryOrder.dto';
import { UpdateOrderDto } from './dtos/updateOrder.dto';
import { ID } from '../global/interfaces/id.interface';
import { ParseIdPipe } from '../global/pipes/parseId.pipe';
import { CreateOrderDto } from './dtos/createOrder.dto';
import { Auth } from '../auth/decorator/auth.decorator';
import { JwtPayload } from '../auth/interface/jwtPayload.interface';

@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrderController {
  constructor(private readonly service: OrderService) {}

  @Get()
  async index(@Query() query: QueryOrderDto) {
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

  @Post()
  async create(@Body() payload: CreateOrderDto, @Auth() user: JwtPayload) {
    return await this.service.create(payload, user.id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIdPipe) id: ID,
    @Body() payload: UpdateOrderDto,
  ) {
    return await this.service.update(id, payload);
  }
}
