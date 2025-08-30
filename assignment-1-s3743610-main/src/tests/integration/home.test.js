// src/tests/integration/home.test.js
const request = require('supertest');
const mongoose = require('mongoose');

// Import the Express app (exported as module.exports = app)
const app = require('../../app');   // <-- was ../../src/app and destructured

let testServer;

beforeAll(() => {
  testServer = app.listen(4001);
});

afterAll(async () => {
  await mongoose.connection.close();
  await new Promise((r) => testServer.close(r));
});

test('GET / renders index.ejs', async () => {
  const res = await request(testServer).get('/');  // <-- use testServer
  expect(res.status).toBe(200);
  expect(res.headers['content-type']).toMatch(/html/);
  expect(res.text).toMatch(/Take Notes Tonight/i); // something from index.ejs
});

