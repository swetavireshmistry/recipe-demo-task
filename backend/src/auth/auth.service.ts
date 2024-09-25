import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'schemas/user.schema';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    try {
      // Check if the user exists
      const user = await this.userService.findByEmail(email);
      if (!user) {
        throw new NotFoundException('User not found'); // Throw an error if user is not found
      }

      // Compare passwords
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid password'); // Throw an error if the password is incorrect
      }
      return user;
    } catch (error) {
      // Handle any unexpected errors
      console.error('Error during user validation:', error);
      throw error; 
    }
  }

  async login(user: any) {
    const payload = { username: user.username, userId: user._id };
    try {
      return {
        access_token: this.jwtService.sign(payload),
        userId: user._id
      };
    } catch (error) {
      console.error("Login error:", error);
      throw new Error("Login failed, please try again.");
    }
  }
  
  async validateToken(token: string): Promise<User | null> {
    try {
      const decoded = this.jwtService.verify(token);
      const user = await this.userService.findById(decoded.userId); 
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user; 
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
