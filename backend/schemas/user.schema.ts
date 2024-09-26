import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import * as validator from 'validator';

export type UserDocument = User & Document;
@Schema({ 
  timestamps: true,
  toJSON: {
    transform(doc, ret) {
      delete ret.password;
      delete ret.__v; 
      delete ret.updatedAt; 
      return ret;
    }
  },
  toObject: {
    transform(doc, ret) {
      delete ret.password;
      delete ret.__v; 
      delete ret.updatedAt; 
      return ret;
    }
  }
})
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: (email: string) => validator.isEmail(email),
      message: (props) => `${props.value} is not a valid email!`,
    },
  })
  email: string;

  @Prop({
    required: true,
    validate: {
      validator: (password: string) => validatePassword(password),
      message: () =>
        `Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one special character.`,
    },
  })
  password: string;

  @Prop({ required: true })
  bio: string;

  @Prop({
    default:
      '1727153947303.png',
  })
  image: string;
}

// Create a password validator function
function validatePassword(password: string): boolean {  
  const passwordPattern = new RegExp(process.env.PASSWORD_PATTERN!);
  return passwordPattern.test(password);
}

export const UserSchema = SchemaFactory.createForClass(User);

// Add pre-save hook to hash the password
UserSchema.pre<UserDocument>('save', async function (next) {
  // Check if password has been modified and then hash it
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});
