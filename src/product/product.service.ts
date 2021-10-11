import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dtos/createProduct.dto';
import { Product } from './schemas/product.schema';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { QueryProductDto } from './dtos/queryProduct.dto';
import { PaginateResponse } from '../global/interfaces/paginate.interface';
import { UpdateProductDto } from './dtos/updateProduct.dto';
import { ID } from '../global/interfaces/id.interface';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product)
    private readonly model: ReturnModelType<typeof Product>,
  ) {}

  async findAll(query: QueryProductDto): Promise<PaginateResponse<Product>> {
    const findQuery = this.model.find();
    if (query.category) {
      findQuery.where('category', query.category);
    }
    if (query.tag) {
      findQuery.where('tags', query.tag);
    }
    if (query.search) {
      findQuery.or([
        { description: { $regex: '.*' + query.search + '.*', $options: 'i' } },
        { title: { $regex: '.*' + query.search + '.*', $options: 'i' } },
      ]);
    }
    if (query.activated) {
      findQuery.where({ activated: query.activated });
    }
    const count = await this.model.find().merge(findQuery).countDocuments();
    findQuery
      .sort({ [query.sortBy]: query.sortType })
      .skip(query.page * query.size)
      .limit(query.size);

    return {
      items: await findQuery.populate('category', 'title').exec(),
      paginate: {
        page: query.page,
        size: query.size,
        count,
      },
    };
  }

  async findOne(id: ID): Promise<Product> {
    return await this.model.findById(id).populate('category').exec();
  }

  async create(product: CreateProductDto): Promise<Product> {
    return this.model.create(product);
  }

  async remove(id: ID): Promise<Product> {
    return this.model.findByIdAndRemove(id);
  }

  async update(id: ID, payload: UpdateProductDto) {
    return this.model.findByIdAndUpdate(id, payload, { new: true });
  }
}
