import express from 'express';
import { User } from './models/User.mjs';
import { Task } from './models/Task.mjs';
import './db/mongoose.js';

const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());

app.post('/users', async (req, res) => {
  console.log(req.body);
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send(user);
  }
  catch (error) {
    res.status(400).send(error);
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  }
  catch (error) {
    res.status(500).send(error);
  }
});

app.get('/users/:id', async (req, res) => {
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
});

app.post('/tasks', (req, res) => {
  const task = new Task(req.body);
  task.save()
    .then(() => {
      res.status(201).send(task);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

app.get('/tasks', (req, res) => {
  Task.find({})
    .then(tasks => res.send(tasks))
    .catch((error) => res.status(500).send());
});

app.get('/tasks/:id', (req, res) => {
  Task.findById(req.params.id)
    .then(task => {
      if (!task) {
        return res.status(404).send();
      }
      res.send(task);
    })
    .catch((error) => res.status(500).send());
});












app.listen(port, () => {
  console.log(`Listening on ${port}`);
}); 