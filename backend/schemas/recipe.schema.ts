import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type RecipeDocument = Recipe & Document;
@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
      delete ret.updatedAt;
      return ret;
    }
  }
})
export class Recipe {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  photo: string;

  @Prop({ required: true })
  ingredients: string[];

  @Prop({ required: true })
  instructions: string[];

  @Prop({ required: true })
  cookTime: string;
  @Prop({ required: true })
  prepTime: string;

  @Prop({ required: false })
  description?: string;

  @Prop({
    required: true,
    enum: ['easy', 'medium', 'hard'],
  })
  difficulty: string;

  @Prop({ required: false, type: [String] })
  tags?: string[];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  createdBy: string;
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);
