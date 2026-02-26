import express from 'express';
import { Task } from '../models/Task.mjs';

export const tasksRouter = new express.Router();

tasksRouter.route('/tasks')
  .post(async (req, res) => {
    try {
      const task = new Task(req.body);
      const newTask = await task.save();
      res.status(201).send(newTask);
    }
    catch (error) {
      res.status(400).send(error);
    }
  })
  .get(async (req, res) => {
    try {
      const tasks = await Task.find({});
      res.send(tasks);
    }
    catch (error) {
      res.status(500).send(error);
    }
  });

tasksRouter.route('/tasks/:id')
  .get(async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
      if (!task) {
        return res.status(404).send();
      }
      res.send(task);
    }
    catch (error) {
      res.status(500).send(error);
    }
  })
  .patch(async (req, res) => {
    const updates = Object.keys(req.body);
    const acceptedUpdated = ['description', 'completed'];
    const isValidOperation = updates.every(updt => acceptedUpdated.includes(updt));
    if (!isValidOperation) {
      res.status(400).send({ error: 'Invalid update' });
    }

    try {
      const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
        returnDocument: 'after',
        runValidators: true
      });
      if (!updatedTask) {
        return res.status(404).send()
      }
      res.send(updatedTask);
    }
    catch (error) {
      res.status(400).send(error);
    }
  })
  .delete(async (req, res) => {
    try {
      const deletedTask = await Task.findByIdAndDelete(req.params.id);
      if (!deletedTask) {
        return res.status(404).send();
      }
      res.send(deletedTask);
    }
    catch (error) {
      res.status(500).send(error);
    }
  });
