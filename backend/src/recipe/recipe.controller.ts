import { Controller, Post, Body, Get, Param, Delete, Put, UseGuards, Req } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto, UpdateRecipeDto } from './dto/recipe.dto';
import { JwtAuthGuard } from 'src/utills/jwt-auth.guard';
import { AuthenticatedRequest } from 'src/utills/request.interface'; // Import custom interface

@Controller('recipes')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) { }

  // Create a new recipe
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createRecipeDto: CreateRecipeDto, @Req() req: AuthenticatedRequest) {
    const user = req.user;
    return this.recipeService.create(createRecipeDto, user);
  }

  // Read all recipes
  @Get()
  async findAll() {
    return this.recipeService.findAll();
  }

  // Read one recipe by id
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.recipeService.findOne(id);
  }
}
