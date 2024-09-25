import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Error as MongooseError } from 'mongoose';
import { User, UserDocument } from 'schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

// Type guard to check if error is a Mongoose ValidationError
function isValidationError(error: any): error is MongooseError.ValidationError {
  return error && error.name === 'ValidationError';
}

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async create(userData: CreateUserDto): Promise<{ userId: string }> {
    const createdUser = new this.userModel({
      ...userData,
      password: userData.password,
    });
  
    try {
      const user = await createdUser.save();
      return {
        userId: (user._id as unknown as string), 
      };
    } catch (error) {
      // Handle duplicate email error
      if (error.code === 11000) {
        throw new ConflictException('Email already exists.');
      }
      // Handle validation errors
      if (isValidationError(error)) {
        const validationErrors = Object.values(error.errors).map(err => err.message);
        throw new BadRequestException(validationErrors);
      }
      // Handle any other errors
      throw new InternalServerErrorException('Error creating user. Please try again later.');
    }
  }
  
  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<User> {
    try {
      const user = await this.userModel.findById(id).exec();
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      // Handle any potential errors that occur during the find operation
      throw new InternalServerErrorException('Error retrieving user. Please try again later.');
    }
  }
}
