import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; 
import { User, UserSchema } from 'schemas/user.schema';
import { Recipe, RecipeSchema } from 'schemas/recipe.schema';
import { RecipeService } from './recipe.service';
import { RecipeController } from './recipe.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Recipe.name, schema: RecipeSchema },{ name: User.name, schema: UserSchema }]), 
  ],
  providers: [RecipeService],
  controllers: [RecipeController],
})
export class RecipeModule {}
