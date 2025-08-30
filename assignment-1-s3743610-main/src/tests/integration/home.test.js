const request = require('supertest');
const mongoose = require('mongoose');
const { app } = require('../../app'); // <-- fixed

let testServer;

beforeAll(() => {
  testServer = app.listen(4001);
});

afterAll(async () => {
  await mongoose.connection.close();
  await new Promise((r) => testServer.close(r));
});

test('GET / renders index.ejs', async () => {
  const res = await request(app).get('/');
  expect(res.status).toBe(200);
  expect(res.headers['content-type']).toMatch(/html/);
});
