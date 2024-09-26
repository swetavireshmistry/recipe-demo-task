import { ObjectId } from "mongoose";

export interface RecipeType {
    _id: ObjectId;
    title: string;
    photo: string;
    tags: string[];
    createdAt: Date;
    author: string;
  }