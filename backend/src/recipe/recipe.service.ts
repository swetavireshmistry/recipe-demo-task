import { Injectable, NotFoundException, ForbiddenException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateRecipeDto, UpdateRecipeDto } from './dto/recipe.dto';
import { Recipe, RecipeDocument } from 'schemas/recipe.schema';
import { UserDocument } from 'schemas/user.schema';

@Injectable()
export class RecipeService {
  constructor(
    @InjectModel(Recipe.name) private recipeModel: Model<RecipeDocument>,
    @InjectModel('User') private readonly userModel: Model<UserDocument>
  ) { }

  // Create a new recipe
  async create(createRecipeDto: CreateRecipeDto, user: any): Promise<RecipeDocument> {
    try {
      // Validate required fields
      if (!createRecipeDto.title || !createRecipeDto.ingredients || !createRecipeDto.instructions) {
        throw new BadRequestException('Title, ingredients, and instructions are required.');
      }

      // Create a new recipe with the provided data and the user ID
      const newRecipe = new this.recipeModel({
        ...createRecipeDto,
        createdBy: user.userId
      });

      // Save the new recipe to the database
      return await newRecipe.save();

    } catch (error) {
      // Delegate error handling to the handleError method
      this.handleError(error, 'Error creating the recipe');
    }
  }

  // Find All recipes
  async findAll(): Promise<any[]> {
    try {
      const recipes = await this.recipeModel.aggregate([
        {
          $lookup: {
            from: 'users', // The collection name for users
            localField: 'createdBy',
            foreignField: '_id',
            as: 'authorInfo',
          },
        },
        {
          $unwind: {
            path: '$authorInfo',
            preserveNullAndEmptyArrays: true, // Keep recipes even if there is no author
          },
        },
        {
          $project: {
            title: 1,
            tags: 1,
            createdAt: 1,
            photo: 1,
            author: '$authorInfo.username', // Rename the field
          },
        },
      ]).exec();

      return recipes;
    } catch (error) {
      // Use the handleError method for consistent error handling
      this.handleError(error, 'Error fetching recipes');
    }
  }

  // Find one recipe by ID
  async findOne(id: string): Promise<any> {
    try {
      const objectId = new mongoose.Types.ObjectId(id);
      const recipe = await this.recipeModel
        .findById(objectId)
        .populate('createdBy', 'username image bio') // Populate user fields
        .select('-updatedAt -__v') // Exclude unwanted fields
        .exec();

      if (!recipe) {
        throw new NotFoundException(`Recipe with ID ${id} not found`);
      }

      return recipe
    } catch (error) {
      console.error('Error fetching recipe:', error); 
      this.handleError(error, `Recipe with ID ${id} not found`);
    }
  }

  // Error handler method for validation and server errors
  private handleError(error: any, customMessage?: string) {
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map((err: any) => err.message);
      throw new BadRequestException(validationErrors.join(', '));
    }

    // Handle unique constraint violations
    if (error.code === 11000) {
      const fieldName = Object.keys(error.keyValue)[0];
      throw new BadRequestException(`The ${fieldName} must be unique`);
    }

    // Handle other Mongoose errors (cast errors, etc.)
    if (error.name === 'CastError') {
      throw new NotFoundException(customMessage || 'Resource not found');
    }

    // For any other errors
    throw new InternalServerErrorException(customMessage || 'An unexpected error occurred');
  }
}
