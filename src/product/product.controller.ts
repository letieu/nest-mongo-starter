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
import { ProductService } from './product.service';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { QueryProductDto } from './dtos/queryProduct.dto';
import { UpdateProductDto } from './dtos/updateProduct.dto';
import { ID } from '../global/interfaces/id.interface';
import { ParseIdPipe } from '../global/pipes/parseId.pipe';
import { CreateProductDto } from './dtos/createProduct.dto';

@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Get()
  async index(@Query() query: QueryProductDto) {
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
  async create(@Body() payload: CreateProductDto) {
    return await this.service.create(payload);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIdPipe) id: ID,
    @Body() payload: UpdateProductDto,
  ) {
    return await this.service.update(id, payload);
  }
}
