// src/models/note.js
const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.models.Note || mongoose.model('Note', NoteSchema);

