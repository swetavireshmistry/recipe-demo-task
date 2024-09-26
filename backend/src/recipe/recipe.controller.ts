import { Controller, Post, Body, Get, Param, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '@src/utills/jwt-auth.guard';
import { AuthenticatedRequest } from '@src/utills/request.interface';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/recipe.dto';

@Controller('recipes')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) { }

  /**
   * Creates a new recipe.
   *
   * @param createRecipeDto The data transfer object containing the recipe details.
   * @param req The request object containing authenticated user information.
   * @return The newly created recipe.
   */
  @UseGuards(JwtAuthGuard) // Protect the route with JWT authentication
  @Post()
  async create(@Body() createRecipeDto: CreateRecipeDto, @Req() req: AuthenticatedRequest) {
    const user = req.user; // Extract user information from the request
    return this.recipeService.create(createRecipeDto, user.userId); // Call the service to create the recipe
  }

  /**
   * Retrieves all recipes.
   *
   * @return An array of recipes.
   */
  @Get()
  async findAll() {
    return this.recipeService.findAll(); // Call the service to get all recipes
  }

  /**
   * Retrieves a single recipe by its ID.
   *
   * @param id The ID of the recipe to retrieve.
   * @return The requested recipe.
   */
  @UseGuards(JwtAuthGuard) // Protect the route with JWT authentication
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.recipeService.findOne(id); // Call the service to find the recipe by ID
  }
}
