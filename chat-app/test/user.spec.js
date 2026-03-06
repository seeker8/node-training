import { beforeEach, test, expect } from 'vitest';
import { addUser, removeUser, getUser, getUsersInRoom } from '../src/utils/user.js';


beforeEach(() => {
  const users = [
    {
      id: 12,
      username: 'Aira',
      room: 'dandadan'
    },
    {
      id: 14,
      username: 'Jiji',
      room: 'dandadan'
    },
    {
      id: 16,
      username: 'Miramira',
      room: 'withcriv'
    },
    {
      id: 18,
      username: 'Nona',
      room: 'withcriv'
    }
  ];
  for (const user of users) {
    addUser(user);
  }
});

test('add user', () => {
  const { user } = addUser({
    id: 23,
    username: 'Okarun',
    room: 'dandadan'
  });
  expect(user).not.toBeNull();
  expect(user.userName).toBe('okarun');
});

test('remove user', () => {
  const removed = removeUser(23);
  expect(removed).not.toBeNull();
  expect(removed.userName).toBe('okarun');
});

test('get user', () => {
  const user = getUser(18);
  expect(user.userName).toBe('nona');
});

test('get user in room', () => {
  const usersInRoom = getUsersInRoom('withcriv');
  const usersInDandadan = getUsersInRoom('dandadan');
  expect(usersInRoom.length).toBe(2);
  expect(usersInDandadan.length).toBe(2);
})