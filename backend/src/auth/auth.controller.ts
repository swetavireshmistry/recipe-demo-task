import { Controller, Post, Body, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { UserType } from '@src/utills/user.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  /**
   * Handles user login requests.
   * Validates the user's email and password, and returns an access token if valid.
   *
   * @param loginUserDto The data transfer object containing the user's login credentials.
   * @return An object containing the access token if login is successful, or an error message if credentials are invalid.
   */
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user: UserType = await this.authService.validateUser(email, password);
    if (!user) {
      return { message: 'Invalid credentials' };
    }
   
    // Extracting user properties for the token payload
    const { _id: userId, username } = user;

    // Call the AuthService to generate and return the JWT token
    return this.authService.login(username, userId);
  }

  /**
   * Verifies the provided JWT token.
   * Returns user information if the token is valid.
   *
   * @param authorization The authorization header containing the JWT token.
   * @return An object containing a message and user data if the token is valid, or an error message if not.
   */
  @Post('verify')
  async verifyToken(@Headers('authorization') authorization: string) {
    const token = authorization?.split(' ')[1];
    if (!token) {
      return { message: 'Token not provided' };
    }

    // Validate the token and return the user associated with it
    const user = await this.authService.validateToken(token);
    return { message: 'Token is valid', user };
  }
}
