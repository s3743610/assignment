const mongoose = require('mongoose');
const Note =
  require('../../models/note') || // <-- fixed
  mongoose.models.Note ||
  mongoose.model(
    'Note',
    new mongoose.Schema({ title: { type: String, required: true }, description: String })
  );

describe('Note model', () => {
  test('is valid when title and description are provided', async () => {
    const note = new Note({ title: 'A', description: 'B' });
    await expect(note.validate()).resolves.toBeUndefined();
  });

  test('is valid when description is missing', async () => {
    const note = new Note({ title: 'Only title' });
    await expect(note.validate()).resolves.toBeUndefined();
  });
});
