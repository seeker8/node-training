import { Schema, model } from 'mongoose';
import bycrypt from 'bcrypt';
import isEmail from 'validator/lib/isEmail.js';


const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    validate: {
      validator(v) {
        if (v < 0) {
          throw new Error('Age must be a positive number');
        }
      }
    }
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    validate: {
      validator: function (v) {
        return isEmail(v);
      },
      message: 'Email is invalid'
    }
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    trim: true,
    validate: {
      validator(v) {
        return !v.toLowerCase().includes('password');
      },
      message: 'Password cannot contain password'
    },
    errorMsg: 'Password Invalid'
  },
  occupation: String
});

UserSchema.pre('save', async function () {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bycrypt.hash(user.password, 8);
  }

});

export const User = new model('User', UserSchema);