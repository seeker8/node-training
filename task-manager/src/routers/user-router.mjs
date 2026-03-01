import express from 'express';
import sharp from 'sharp';
import { auth } from '../middleware/auth.mjs';
import { User } from '../models/User.mjs';
import multer from 'multer';

export const userRouter = new express.Router();

const avatar = multer({
  limts: {
    fileSize: 1e6
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/i)) {
      return cb(new Error('Please upload a file jpg, jpeg, png'));
    }
    cb(undefined, true);
  }
});

userRouter.route('/users')
  .post(async (req, res) => {
    try {
      const user = new User(req.body);
      await user.save();
      const token = await user.generateAuthToken();
      res.status(201).send({ user, token });
    }
    catch (error) {
      res.status(400).send(error);
    }
  });

userRouter.route('/users/me')
  .all(auth)
  .get(async (req, res) => {
    res.send(req.user);
  })
  .delete(async (req, res) => {
    try {
      await req.user.deleteOne();
      res.send(req.user);
    }
    catch (error) {
      res.status(500).send(error);
    }
  })
  .patch(async (req, res) => {
    try {
      req.user.set(req.body);
      await req.user.save();
      res.send(req.user);
    }
    catch (error) {
      res.status(400).send(error);
    }
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

userRouter.route('/users/me/avatar')
  .all(auth)
  .post(avatar.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .png()
      .resize({
        width: 250,
        height: 250
      })
      .toBuffer();

    req.user.avatar = buffer;
    await req.user.save();
    res.send('avatar')
  }, (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  })
  .delete(async (req, res) => {
    try {
      req.user.avatar = undefined;
      await req.user.save();
      res.send(req.user);
    }
    catch (error) {
      res.status(500).send();
    }
  });

userRouter.route('/users/:id/avatar')
  .get(async (req, res) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user || !user.avatar) {
        throw new Error();
      }

      res.set('Content-Type', 'image/png');
      res.send(user.avatar);
    }
    catch (error) {
      console.log(error);
      res.status(404).send();
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

userRouter.route('/users/logoutAll')
  .post(auth, async (req, res) => {
    try {
      req.user.tokens = []
      await req.user.save();
      res.send()
    }
    catch (error) {
      res.status(500).send();
    }
  });
