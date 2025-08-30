const request = require('supertest');
const mongoose = require('mongoose');
const { app } = require('../../app'); // <-- fixed

let testServer;

beforeAll(() => {
  testServer = app.listen(4002);
});

afterAll(async () => {
  await mongoose.connection.close();
  await new Promise((r) => testServer.close(r));
});

test('should add a new note and redirect to login', async () => {
  const res = await request(app).post('/notes').send({
    title: 'Test Title',
    description: 'Test Desc',
  });
  expect(res.status).toBe(302);
  expect(res.headers.location).toBe('/login');
});
