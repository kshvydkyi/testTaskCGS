// TODO: Put a real interfaces here
import { Document } from 'mongoose';

export interface ITodo extends Document {
  title: string;
  description: string;
  isPublic: boolean;
  isComplited: boolean;
  createdAt: Date;
  updatedAt: Date;
}
