import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Recipe, RecipeDocument } from 'schemas/recipe.schema';
import { UserDocument } from 'schemas/user.schema';
import { ErrorHandler } from '@src/utills/errorHandler';
import { RecipeType } from '@src/utills/recipe.interface';
import { CreateRecipeDto } from './dto/recipe.dto';

@Injectable()
export class RecipeService {
  constructor(
    @InjectModel(Recipe.name) private recipeModel: Model<RecipeDocument>,
    @InjectModel('User') private readonly userModel: Model<UserDocument>
  ) {}

  /**
   * Creates a new recipe with the given details and associates it with the user ID.
   *
   * @param createRecipeDto The data transfer object containing the recipe details.
   * @param userId The ID of the user creating the recipe.
   * @return The newly created recipe document.
   */
  async create(createRecipeDto: CreateRecipeDto, userId: string): Promise<RecipeDocument> {
    try {
      // Validate required fields
      if (!createRecipeDto.title) {
        throw new BadRequestException('Title is required.'); // Validate title
      }
      if (!createRecipeDto.ingredients) {
        throw new BadRequestException('Ingredients are required.'); // Validate ingredients
      }
      if (!createRecipeDto.instructions) {
        throw new BadRequestException('Instructions are required.'); // Validate instructions
      }

      // Create a new recipe with the provided data and the user ID
      const newRecipe = new this.recipeModel({
        ...createRecipeDto,
        createdBy: userId
      });

      // Save the new recipe to the database
      return await newRecipe.save();

    } catch (error) {
      // Delegate error handling to the handleError method
      ErrorHandler.handleError(error, 'Error creating the recipe');
    }
  }

  /**
   * Retrieves all recipes with author information.
   *
   * @return An array of recipes with author details.
   */
  async findAll(): Promise<RecipeType[]> {
    try {
      const recipes = await this.recipeModel.aggregate([
        {
          $lookup: {
            from: 'users', // The collection name for users
            localField: 'createdBy',
            foreignField: '_id',
            as: 'authorInfo', // Join user information
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
            author: '$authorInfo.username', // Rename the field for output
          },
        },
      ]).exec();

      return recipes; // Return the aggregated recipes
    } catch (error) {
      // Use the handleError method for consistent error handling
      ErrorHandler.handleError(error, 'Error fetching recipes');
    }
  }

  /**
   * Finds a single recipe by its ID.
   *
   * @param id The ID of the recipe to find.
   * @return The requested recipe document.
   */
  async findOne(id: string): Promise<Recipe> {
    try {
      const objectId = new mongoose.Types.ObjectId(id); // Convert the ID to ObjectId
      const recipe = await this.recipeModel
        .findById(objectId)
        .populate('createdBy', 'username image bio') // Populate user fields
        .select('-updatedAt -__v') // Exclude unwanted fields
        .exec();

      if (!recipe) {
        throw new NotFoundException(`Recipe with ID ${id} not found`); // Throw error if recipe is not found
      }

      return recipe; // Return the found recipe
    } catch (error) {
      ErrorHandler.handleError(error, `Recipe with ID ${id} not found`);
    }
  }
}
