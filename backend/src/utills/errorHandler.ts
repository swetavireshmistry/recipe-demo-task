import { BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Error as MongooseError } from 'mongoose';

export class ErrorHandler {
  // Error handler method for validation and server errors
  static handleError(error: unknown, customMessage?: string) {
    if (error instanceof MongooseError.ValidationError) {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      throw new BadRequestException(validationErrors.join(', '));
    }

    if (error instanceof MongooseError) {
      if ('code' in error && error.code === 11000) {
        const fieldName = Object.keys('keyValue' in error && error.keyValue)[0];
        throw new BadRequestException(`The ${fieldName} must be unique`);
      }

      if (error instanceof MongooseError.CastError) {
        throw new NotFoundException(customMessage || 'Resource not found');
      }
    }

    throw new InternalServerErrorException(customMessage || 'An unexpected error occurred');
  }
}
