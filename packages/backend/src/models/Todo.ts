import { Model, model, Schema } from 'mongoose';
import { ITodo } from '../types/todos.type';

const todoSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  description: { type: String, required: true },
  isPublic: { type: Boolean, default: true },
  isComplited: { type: Boolean, default: false },
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() }
});

const Todo: Model<ITodo> = model('Todo', todoSchema);

export default Todo;
