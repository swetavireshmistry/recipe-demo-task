import { Global, Module } from '@nestjs/common';
import { DbConnectionService } from './db_connection.service';
import { MongooseModule } from '@nestjs/mongoose';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: DbConnectionService,
    }),
  ],
  providers: [DbConnectionService],
  exports: [DbConnectionService]
})
export class DbConnectionModule {}
