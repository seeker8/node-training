import { connect, Schema, model } from 'mongoose';
import isEmail from 'validator/lib/isEmail.js';

const dbURI = 'mongodb://localhost:27017/task-manager';
// connect to mongoDB
connect(dbURI, {
  autoCreate: true
});


const UserSchema = new Schema({
  name: {
    type: String,
    require: true,
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
    require: true,
    lowercase: true,
    validate: {
      validator: function (v) {
        return isEmail(v);
      },
      errorMsg: 'Email is invalid'
    }
  },
  occupation: String
});

const TaskSchema = new Schema({
  description: {
    type: String,
    require: true
  },
  completed: {
    type: Boolean,
    default: false
  }
});

const User = new model('User', UserSchema);
const Task = new model('Task', TaskSchema);

const user = new User({
  name: 'Aria',
  age: 16,
  occupation: 'student'
});

const task = new Task({
  description: 'an awesome description',
  completed: false
});

// test validator
const user2 = new User({
  name: 'Kinta    ',
  age: 16,
  occupation: 'student',
  email: 'test@test.com'
});
const resultUser = await user2.save();
console.log(resultUser);

// await user.save()
// const createdTask = await task.save();
// console.log(createdTask);