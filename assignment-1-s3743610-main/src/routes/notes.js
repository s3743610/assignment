// src/routes/notes.js
const express = require('express');
const router = express.Router();
const Note = require('../models/note');

// GET /notes/new  -> render the "new note" form
router.get('/new', (_req, res) => {
  res.render('new');
});

// POST /notes     -> create a note, then go back to the list
router.post('/', async (req, res, next) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      // Simple validation — re-render form with a message if you want
      return res.status(400).render('new', { error: 'Title and description are required.' });
    }
    await Note.create({ title, description });
    return res.redirect('/');
  } catch (err) {
    return next(err);
  }
});

// DELETE /notes/:id   -> delete a note, then go back to the list
router.delete('/:id', async (req, res, next) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    return res.redirect('/');
  } catch (err) {
    return next(err);
  }
});

module.exports = router;

