import request from 'supertest';
import { app } from '../src/app.mjs';
import { test, beforeEach } from 'vitest';
import { User } from '../src/models/User.mjs';

const userOne = {
  name: 'Momo',
  email: 'momo@dandadan.com',
  password: 'TakakuraKen'
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
})