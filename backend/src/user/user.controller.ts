import { Controller, Post, Body, UseGuards, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<{ userId: string }> {
    return this.usersService.create(createUserDto);
  }
}
