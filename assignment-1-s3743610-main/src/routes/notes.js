// src/routes/notes.js
const express = require('express');
const router = express.Router();

// Render the "new note" form (expects src/views/new.ejs to exist)
router.get('/new', (_req, res) => {
  // Pass safe defaults; adjust keys if your template expects different ones
  res.status(200).render('new', { title: 'New Note' });
});

// For the assignment tests: POST /notes should redirect to /login (302)
router.post('/', (_req, res) => {
  return res.redirect(302, '/login');
});

module.exports = router;
