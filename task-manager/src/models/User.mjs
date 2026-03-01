import { Schema, model } from 'mongoose';
import { Task } from '../models/Task.mjs';
import bycrypt from 'bcrypt';
import isEmail from 'validator/lib/isEmail.js';
import jwt from 'jsonwebtoken';


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
    unique: true,
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
  avatar: {
    type: Buffer
  },
  occupation: String,
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
}, {
  timestamps: true
});

UserSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'owner'
});

UserSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, 'thisistheway');
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.tokens;
  delete userObject.password;
  return userObject;
}

UserSchema.statics.findByCredentials = async (email, pwd) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Unable ot login');
  }

  const isMatch = await bycrypt.compare(pwd, user.password);

  if (!isMatch) {
    throw new Error('Unable to login');
  }
  return user;
};

UserSchema.pre('save', async function () {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bycrypt.hash(user.password, 8);
  }

});

UserSchema.pre('deleteOne', { document: true, query: false }, async function () {
  const user = this;
  await Task.deleteMany({ owner: user._id });
});

export const User = new model('User', UserSchema);