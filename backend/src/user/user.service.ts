import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'schemas/user.schema';
import { ErrorHandler } from '@src/utills/errorHandler';
import { CreateUserDto } from './dto/create-user.dto';

// Service for managing user-related operations
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  /**
   * Creates a new user in the database with the provided data.
   *
   * @param userData The data transfer object containing user registration details.
   * @return The ID of the newly created user.
   */
  async create(userData: CreateUserDto): Promise<{ userId: string }> {
    const createdUser = new this.userModel({
      ...userData,
      password: userData.password, // Assuming password handling is done securely
    });

    try {
      const user = await createdUser.save(); // Save the user to the database
      return {
        userId: (user._id as string), // Return the user's ID
      };
    } catch (error) {
      // Handle any errors that occur during user creation
      ErrorHandler.handleError(error, 'Error creating user. Please try again later.');
    }
  }

  /**
   * Finds a user by their email address.
   *
   * @param email The email address of the user to find.
   * @return The user document if found, otherwise null.
   */
  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec(); // Query the database for the user by email
  }

  /**
   * Finds a user by their ID.
   *
   * @param id The ID of the user to find.
   * @return The user document if found.
   * @throws NotFoundException if the user does not exist.
   */
  async findById(id: string): Promise<User> {
    try {
      const user = await this.userModel.findById(id).exec(); // Query the database for the user by ID
      if (!user) {
        throw new NotFoundException('User not found'); // Throw an error if the user does not exist
      }
      return user; // Return the found user
    } catch (error) {
      // Handle any errors that occur during user retrieval
      ErrorHandler.handleError(error, 'Error retrieving user. Please try again later.');
    }
  }
}
