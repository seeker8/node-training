import { auth } from '../src/middleware/auth.mjs';
import { describe, test, expect } from 'vitest';

const myFn = async (a, b) => {
  return new Promise((res) => setTimeout(() => { res(a + b); }, 2000));
}

describe('bigger test', () => {
  test('hello', () => async () => {
    const r = await myFn(1, 2);
    expect(r).toBe(3);
  });
})