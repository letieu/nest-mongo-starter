import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dtos/createOrder.dto';
import { Order } from './schemas/order.schema';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { QueryOrderDto } from './dtos/queryOrder.dto';
import { PaginateResponse } from '../global/interfaces/paginate.interface';
import { UpdateOrderDto } from './dtos/updateOrder.dto';
import { ID } from '../global/interfaces/id.interface';
import { model } from 'mongoose';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order)
    private readonly model: ReturnModelType<typeof Order>,
  ) {}

  async findAll(query: QueryOrderDto): Promise<PaginateResponse<Order>> {
    const findQuery = this.model.find();
    if (query.customerName) {
      findQuery.where('customerName', {
        $regex: '.*' + query.customerName + '.*',
        $options: 'i',
      });
    }
    if (query.customerPhone) {
      findQuery.where('customerPhone', query.customerPhone);
    }
    if (query.status) {
      findQuery.where('status', query.status);
    }
    if (query.createdBy) {
      findQuery.where('createdBy', query.createdBy);
    }
    const count = await this.model.find().merge(findQuery).countDocuments();
    findQuery
      .sort({ [query.sortBy]: query.sortType })
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

  async findOne(id: ID): Promise<Order> {
    return await this.model
      .findById(id)
      .populate('items.product', '', 'Product')
      .exec();
  }

  async create(order: CreateOrderDto, authorId: ID): Promise<Order> {
    if (order.items.length < 1)
      throw new HttpException('Order must have item', HttpStatus.BAD_REQUEST);
    const total = order.items.reduce((t, item) => t + item.total, 0);
    return this.model.create({
      ...order,
      createdBy: authorId,
      total,
    });
  }

  async remove(id: ID): Promise<Order> {
    return this.model.findByIdAndRemove(id);
  }

  async update(id: ID, payload: UpdateOrderDto) {
    if (payload.items) {
      const total = payload.items.reduce((t, item) => t + item.total, 0);
      return this.model.findByIdAndUpdate(
        id,
        { ...payload, total },
        { new: true },
      );
    }
    return this.model.findByIdAndUpdate(id, payload, { new: true });
  }
}
