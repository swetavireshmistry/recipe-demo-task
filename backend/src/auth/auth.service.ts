import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) { }

  /**
   * Validates the user by checking the email and password.
   * If valid, returns the user object.
   *
   * @param email The email address of the user attempting to log in.
   * @param password The password entered by the user.
   * @return The user object if validation is successful, or throws an exception if not.
   */
  async validateUser(email: string, password: string): Promise<User | null> {
    try {
      // Check if the user exists
      const user = await this.userService.findByEmail(email);
      if (!user) {
        // Throw an error if user is not found
        throw new NotFoundException('User not found');
      }

      // Compare passwords
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        // Throw an error if the password is incorrect
        throw new UnauthorizedException('Invalid password');
      }
      return user;
    } catch (error) {
      // Handle any unexpected errors
      throw error;
    }
  }

  /**
   * Generates a JWT token for the user upon successful login.
   *
   * @param username The username of the user.
   * @param userId The ID of the user.
   * @return An object containing the access token and user ID.
   */
  async login(username: string, userId: string) {
    const payload = { username, userId };
   try {
      return {
        // Sign the payload to create a JWT token
        access_token: this.jwtService.sign(payload),
        userId // Return the user ID
      };
    } catch (error) {
      // Handle token generation errors
      throw new Error("Login failed, please try again.");
    }
  }

  /**
   * Validates the provided JWT token and returns the associated user.
   *
   * @param token The JWT token to be validated.
   * @return The user object if the token is valid, or throws an exception if not.
   */
  async validateToken(token: string): Promise<User | null> {
    try {
      const decoded = this.jwtService.verify(token); // Verify the JWT token
      const user = await this.userService.findById(decoded.userId);
      if (!user) {
        // Throw an error if user is not found
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      // Handle invalid or expired tokens
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
