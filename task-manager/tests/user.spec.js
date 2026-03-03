import request from 'supertest';
import { app } from '../src/app.mjs';
import { test, beforeEach, expect } from 'vitest';
import { User } from '../src/models/User.mjs';
import {
  userOneId,
  userOne,
  setupDatabase
} from './fixture/db.js';


beforeEach(async () => {
  await setupDatabase();
});

test('signup new user', async () => {
  const response = await request(app)
    .post('/users')
    .send({
      name: 'Seiko',
      email: 'seiko@dandadan.com',
      password: 'test123test'
    })
    .expect(201);

  const user = User.findById(response.body.user._id);
  expect(user).not.toBeNull();
});

test('login', async () => {
  const response = await request(app)
    .post('/users/login')
    .send({
      email: userOne.email,
      password: userOne.password
    })
    .expect(200);
  const dbUser = await User.findById(response.body.user._id);
  expect(dbUser.tokens[1].token).toBe(response.body.token);

});

test('login failure', async () => {
  await request(app)
    .post('/users/login')
    .send({
      email: undefined,
      password: userOne.password
    })
    .expect(400);
});

test('user profile', async () => {
  await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test('user profile not accessible when unauthenticated', async () => {
  await request(app)
    .get('/users/me')
    .send()
    .expect(401);
});

test('delete account', async () => {
  await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test('delete failure when unauthenticated', async () => {
  await request(app)
    .delete('/users/me')
    .send()
    .expect(401);
});

test('upload avatar', async () => {
  await request(app)
    .post('/users/me/avatar')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .attach('avatar', 'tests/fixture/okarun.jpg')
    .expect(200);
  const user = await User.findById(userOneId);
  expect(user.avatar).toEqual(expect.any(Buffer));
});

test('update user', async () => {
  await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      email: 'ayase@dandadan.com'
    })
    .expect(200);
  const user = await User.findById(userOneId);
  expect(user.email).toBe('ayase@dandadan.com');
});

test('update failure for invalid fields', async () => {
  await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      school: 'Tokyo University'
    })
    .expect(400);
});