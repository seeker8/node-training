import express from 'express';
import { userRouter } from './routers/user-router.mjs';
import { tasksRouter } from './routers/tasks-router.mjs';
import './db/mongoose.js';

const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());

app.use(userRouter);
app.use(tasksRouter);




app.listen(port, () => {
  console.log(`Listening on ${port}`);
}); 