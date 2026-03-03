import request from 'supertest';
import { test, beforeEach, expect } from 'vitest';
import { app } from '../src/app.mjs';
import { Task } from '../src/models/Task.mjs';
import {
  userOneId,
  userOne,
  setupDatabase
} from './fixture/db.js';

beforeEach(async () => {
  await setupDatabase('Aira', 'aira@dandadan.com');
});

test('create task', async () => {
  const response = await request(app)
    .post('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      description: 'test task'
    })
    .expect(201);
  const task = await Task.findOne({ owner: userOneId });
  expect(task.completed).toBe(false);
  expect(task.description).toBe('test task');
});