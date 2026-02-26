import express from 'express';
import { User } from './models/User.mjs';
import { Task } from './models/Task.mjs';
import './db/mongoose.js';

const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());

app.route('/users')
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

app.route('/users/:id')
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

app.route('/tasks')
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

app.route('/tasks/:id')
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
  });












app.listen(port, () => {
  console.log(`Listening on ${port}`);
}); 