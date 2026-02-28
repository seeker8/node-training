import express from 'express';
import { auth } from '../middleware/auth.mjs';
import { Task } from '../models/Task.mjs';

export const tasksRouter = new express.Router();

tasksRouter.route('/tasks')
  .all(auth)
  .post(async (req, res) => {
    try {
      const task = new Task({ ...req.body, owner: req.user._id });
      const newTask = await task.save();
      res.status(201).send(newTask);
    }
    catch (error) {
      res.status(400).send(error);
    }
  })
  .get(async (req, res) => {
    try {
      const tasks = await Task.find({ owner: req.user._id });
      res.send(tasks);
    }
    catch (error) {
      res.status(500).send(error);
    }
  });

tasksRouter.route('/tasks/:id')
  .all(auth)
  .get(async (req, res) => {
    try {
      const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })
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
      const taskToUpdate = await Task.findOne({ _id: req.params.id, owner: req.user.id });
      if (!taskToUpdate) {
        return res.status(404).send()
      }
      taskToUpdate.set(req.body);
      await taskToUpdate.save();
      res.send(taskToUpdate);
    }
    catch (error) {
      res.status(400).send(error);
    }
  })
  .delete(async (req, res) => {
    try {
      const taskToDelete = await Task.findOne({ _id: req.params.id, owner: req.user._id });

      if (!taskToDelete) {
        return res.status(404).send();
      }
      await taskToDelete.deleteOne();
      res.send(taskToDelete);
    }
    catch (error) {
      res.status(500).send(error);
    }
  });
