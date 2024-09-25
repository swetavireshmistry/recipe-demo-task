import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type RecipeDocument = Recipe & Document;

@Schema({ timestamps: true })
export class Recipe {
  @Prop({ required: true })
  title: string; // Title of Recipe

  @Prop({ required: true })
  photo: string; // Photo of Recipe
  @Prop({ required: true })
  ingredients: string[]; // Array of ingredients

  @Prop({ required: true })
  instructions: string[]; // Array of instructions, step-by-step

  @Prop({ required: true })
  cookTime: string; // Cooking time, e.g., "30 mins"

  @Prop({ required: true })
  prepTime: string; // Preparation time, e.g., "15 mins"

  @Prop({ required: false })
  description?: string; // Optional serving size

  @Prop({
    required: true,
    enum: ['easy', 'medium', 'hard'],
  })
  difficulty: string; // Difficulty level

  @Prop({ required: false, type: [String] })
  tags?: string[]; // Optional tags like 'veg', 'nonveg', etc.

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  createdBy: string; // ID of the user who created the recipe
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);
