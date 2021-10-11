import { modelOptions, prop, Severity } from '@typegoose/typegoose';

@modelOptions({
  options: { allowMixed: Severity.ALLOW },
  schemaOptions: {
    timestamps: true,
    toJSON: {
      virtuals: true,
      getters: true,
    },
  },
})
export abstract class BaseModel {
  @prop()
  createdAt: Date; // provided by schemaOptions.timestamps
  @prop()
  updatedAt: Date; // provided by schemaOptions.timestamps
  id: string; // _id getter as string
}
