import express from 'express';
import { User } from '../models/User.mjs';

export const userRouter = new express.Router();

userRouter.route('/users')
  .post(async (req, res) => {
    console.log(req.body);
    const user = new User(req.body);
    try {
      await user.save();
      res.status(201).send(user);
    }
    catch (error) {
      res.status(400).send(error);
    }
  })
  .get(async (req, res) => {
    try {
      const users = await User.find({});
      res.send(users);
    }
    catch (error) {
      res.status(500).send(error);
    }
  });

userRouter.route('/users/:id')
  .get(async (req, res) => {
    try {
      console.log(req.params.id);
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).send()
      }
      res.send(user);
    }
    catch (error) {
      res.status(500).send(error);
    }
  })
  .patch(async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
        returnDocument: 'after',
        runValidators: true
      });
      if (!updatedUser) {
        res.status(404).send(updatedUser);
      }
      res.send(updatedUser);
    }
    catch (error) {
      res.status(400).send(error);
    }
  })
  .delete(async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
        return res.status(404).send();
      }
      res.send(deletedUser);
    }
    catch (error) {
      res.status(500).send(error);
    }
  });