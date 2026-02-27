import express from 'express';
import { auth } from '../middleware/auth.mjs';
import { User } from '../models/User.mjs';

export const userRouter = new express.Router();

userRouter.route('/users')
  .post(async (req, res) => {
    try {
      const user = new User(req.body);
      await user.save();
      const token = user.generateAuthToken();
      res.status(201).send({ user, token });
    }
    catch (error) {
      res.status(400).send(error);
    }
  });

userRouter.route('/users/me')
  .get(auth, async (req, res) => {
    res.send(req.user);
  });

userRouter.route('/users/login')
  .post(async (req, res) => {
    try {
      const user = await User.findByCredentials(req.body.email, req.body.password);
      const token = await user.generateAuthToken();
      res.send({ user, token });
    }
    catch (error) {
      res.status(400).send();
    }
  });

userRouter.route('/users/logout')
  .post(auth, async (req, res) => {
    try {
      req.user.tokens = req.user.tokens.filter(token => token.token !== req.token);
      await req.user.save();
      res.send()
    }
    catch (error) {
      res.status(500).send();
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
      const userToUpdate = await User.findById(req.params.id);

      if (!userToUpdate) {
        res.status(404).send(userToUpdate);
      }

      userToUpdate.set(req.body);
      await userToUpdate.save();
      res.send(userToUpdate);
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