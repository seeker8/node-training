import express from 'express';
import { User } from './models/User.mjs';
import { Task } from './models/Task.mjs';
import './db/mongoose.js';

const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());

app.post('/users', (req, res) => {
  console.log(req.body);
  const user = new User(req.body);
  user.save().then(() => {
    res.send(user);
  }).catch((error) => {
    res.status(400).send(error);
  });
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











app.listen(port, () => {
  console.log(`Listening on ${port}`);
}); 