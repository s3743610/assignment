// src/tests/integration/note.test.js
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');

let testServer;

beforeAll(() => {
  testServer = app.listen(4002);
});

afterAll(async () => {
  await mongoose.connection.close();
  await new Promise((r) => testServer.close(r));
});

test('should add a new note and redirect', async () => {
  const res = await request(testServer)
    .post('/notes')
    .type('form')
    .send({ title: 'Test Note', description: 'Hello' });

  expect([302, 303]).toContain(res.status);
  expect(res.headers.location).toBe('/'); // or '/login' if that's your flow
});

