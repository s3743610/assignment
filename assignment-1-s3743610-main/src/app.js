// src/app.js
require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

// Views & static
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Mongo connection
const uri =
  process.env.MONGODB_URI ||
  (process.env.SERVER ? `${process.env.SERVER}/notes` : 'mongodb://127.0.0.1:27017/notes');

let dbReady = Promise.resolve();
if (mongoose.connection.readyState === 0) {
  dbReady = mongoose.connect(uri);
}

// Routes
const notesRouter = require('./routes/notes');
app.use('/notes', notesRouter);

// Home (render existing index.ejs)
app.get('/', (_req, res) => {
  res.status(200).render('index', { title: 'Notes', notes: [] });
});

// Minimal login route so POST /notes -> /login works in tests
app.get('/login', (_req, res) => {
  res.status(200).send('<h1>Login</h1>');
});

// Start server only if run directly
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  dbReady
    .then(() => {
      app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`));
    })
    .catch((err) => {
      console.error('Failed to connect to MongoDB:', err);
      process.exit(1);
    });
}

module.exports = { app, dbReady };
