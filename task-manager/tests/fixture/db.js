import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { User } from '../../src/models/User.mjs';

export const userOneId = new mongoose.Types.ObjectId();
export const userOne = {
  _id: userOneId,
  name: 'Momo',
  email: 'momo@dandadan.com',
  password: 'TakakuraKen',
  tokens: [{
    token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
  }]
};

export const setupDatabase = async (userName = 'Momo', email = 'momo@dandadan.com') => {
  userOne.name = userName;
  userOne.email = email;
  await User.deleteMany();
  await new User(userOne).save();
}