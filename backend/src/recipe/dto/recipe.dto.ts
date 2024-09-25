import { IsString, IsNotEmpty, IsOptional, IsIn, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRecipeDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  photo: Express.Multer.File; 

  @IsNotEmpty()
  @IsArray()
  @Type(() => String)
  ingredients: string[];

  @IsNotEmpty()
  @IsArray()
  @Type(() => String)
  instructions: string[];

  @IsNotEmpty()
  @IsString()
  cookTime: string;

  @IsNotEmpty()
  @IsString()
  prepTime: string;

  @IsOptional()
  @IsString()
  servingSize?: string;

  @IsNotEmpty()
  @IsString()
  difficulty: string;

  @IsOptional()
  @IsArray()
  @Type(() => String)
  tags?: string[];
}


export class UpdateRecipeDto extends CreateRecipeDto {}
