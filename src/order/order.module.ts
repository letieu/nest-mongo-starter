import { Module } from '@nestjs/common';
import { Order } from './schemas/order.schema';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
  imports: [TypegooseModule.forFeature([Order])],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
