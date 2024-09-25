import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from 'src/utills/jwt.strategy';
import { AuthController } from './auth.controller';
@Module({

  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: "s3cr3tK3y!2024@jwt",
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
