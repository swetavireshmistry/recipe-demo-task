import { Controller, Post, Body, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;    
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      return { message: 'Invalid credentials' };
    }
    return this.authService.login(user);
  }

  @Post('verify')
  async verifyToken(@Headers('authorization') authorization: string) {
    const token = authorization?.split(' ')[1];
    if (!token) {
      return { message: 'Token not provided' };
    }
    
    const user = await this.authService.validateToken(token);
    return { message: 'Token is valid', user };
  }
}
