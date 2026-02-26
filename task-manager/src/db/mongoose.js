import { connect, Schema, model } from 'mongoose';

const dbURI = 'mongodb://localhost:27017/task-manager';
// connect to mongoDB
connect(dbURI, {
  autoCreate: true
});


const UserSchema = new Schema({
  name: String,
  age: Number,
  occupation: String
});

const TaskSchema = new Schema({
  description: String,
  completed: Boolean
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

// await user.save()
const createdTask = await task.save();
console.log(createdTask);