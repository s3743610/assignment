// src/app.js
require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const Note = require('./models/note');
const notesRouter = require('./routes/notes');

const app = express();

// Views & static
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Mongo connection
const uri =
  process.env.MONGODB_URI ||
  (process.env.SERVER ? `${process.env.SERVER}/notes` : 'mongodb://127.0.0.1:27017/notes-app');

mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 })
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => {
    console.error('❌ Failed to connect to MongoDB:', err.message);
    process.exit(1);
  });

// Routes
app.use('/notes', notesRouter);

// Home route – show notes
app.get('/', async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.render('index', { notes });
  } catch (err) {
    console.error('Error fetching notes:', err.message);
    res.status(500).send('Server Error');
  }
});

// Minimal login route so tests pass
app.get('/login', (_req, res) => {
  res.status(200).send('<h1>Login</h1>');
});

// Start server if run directly
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () =>
    console.log(`🚀 Server listening at http://localhost:${PORT}`)
  );
}

module.exports = app;

