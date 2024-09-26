import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  /**
   * Registers a new user by creating an account.
   *
   * @param createUserDto The data transfer object containing user registration details.
   * @return The ID of the newly created user.
   */
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<{ userId: string }> {
    return this.usersService.create(createUserDto); // Call the user service to create a user
  }
}
