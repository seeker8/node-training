import request from 'supertest';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { app } from '../src/app.mjs';
import { test, beforeEach } from 'vitest';
import { User } from '../src/models/User.mjs';

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: 'Momo',
  email: 'momo@dandadan.com',
  password: 'TakakuraKen',
  tokens: [{
    token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
  }]
};

beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
});

test('signup new user', async () => {
  await request(app)
    .post('/users')
    .send({
      name: 'Seiko',
      email: 'seiko@dandadan.com',
      password: 'test123test'
    })
    .expect(201);
});

test('login', async () => {
  await request(app)
    .post('/users/login')
    .send({
      email: userOne.email,
      password: userOne.password
    })
    .expect(200);
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