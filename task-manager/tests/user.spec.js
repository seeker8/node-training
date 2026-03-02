import request from 'supertest';
import { app } from '../src/app.mjs';
import { test } from 'vitest';

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