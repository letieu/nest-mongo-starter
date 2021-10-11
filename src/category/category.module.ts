import { Module } from '@nestjs/common';
import { Category } from './schemas/category.schema';
import { CategoryController } from './category.controller';
import { CateogryService } from './cateogry.service';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
  imports: [TypegooseModule.forFeature([Category])],
  controllers: [CategoryController],
  providers: [CateogryService],
  exports: [CateogryService],
})
export class CategoryModule {}
