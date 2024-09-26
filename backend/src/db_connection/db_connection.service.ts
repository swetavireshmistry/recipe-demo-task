import { Injectable, Logger } from '@nestjs/common';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';

@Injectable()
export class DbConnectionService implements MongooseOptionsFactory {
  private readonly logger = new Logger(DbConnectionService.name); 

  /**
   * Creates and returns Mongoose options for the database connection.
   *
   * @return MongooseModuleOptions containing the URI for connecting to MongoDB.
   *         This can either be a synchronous or asynchronous result.
   */
  createMongooseOptions():
    | MongooseModuleOptions
    | Promise<MongooseModuleOptions> {
    const uri = process.env.MONGO_URI; // Retrieve MongoDB URI from environment variables
    this.logger.log(`Connecting to MongoDB at ${uri}`); // Log the connection attempt to MongoDB
    return {
      uri,
    };
  }
}
