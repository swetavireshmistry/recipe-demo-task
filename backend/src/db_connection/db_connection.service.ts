import { Injectable, Logger } from '@nestjs/common';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';

@Injectable()
export class DbConnectionService implements MongooseOptionsFactory {
  private readonly logger = new Logger(DbConnectionService.name);
  createMongooseOptions():
    | MongooseModuleOptions
    | Promise<MongooseModuleOptions> {
    const uri =process.env.MONGO_URI;
    this.logger.log(`Connecting to MongoDB at ${uri}`);
    return {
      uri,
    };
  }
}
