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

const User = new model('User', UserSchema);

const user = new User({
  name: 'Aria',
  age: 16,
  occupation: 'student'
});

await user.save()
