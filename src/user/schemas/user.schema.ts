import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Transform } from 'class-transformer';
import { Document } from 'mongoose';

@Schema()
export class User {
  @Transform(({ value }) => value.toString())
  _id: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  @Exclude()
  password: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  bio: string;

  @Prop()
  image: string;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
