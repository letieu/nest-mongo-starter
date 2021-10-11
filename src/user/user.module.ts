import { Module } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
  imports: [TypegooseModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
