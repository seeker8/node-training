import { Schema, model } from 'mongoose';

const TaskSchema = new Schema({
  description: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  }
});

export const Task = new model('Task', TaskSchema);