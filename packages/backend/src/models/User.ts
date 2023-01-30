import { Document, Model, model, Schema } from 'mongoose';

export interface IUser extends Document {
  login: string;
  password: string;
  avatar: string;
}

const userSchema: Schema = new Schema({
  login: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: 'default_avatar.png'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const User: Model<IUser> = model('User', userSchema);

export default User;
