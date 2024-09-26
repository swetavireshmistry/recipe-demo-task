import { Module } from '@nestjs/common';
import { DbConnectionModule } from './db_connection/db_connection.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RecipeModule } from './recipe/recipe.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DbConnectionModule,
    UserModule,
    AuthModule,
    RecipeModule,
  ],
})
export class AppModule {}
