const db = require('../db/connection');

const getAllNotes = (req, res) => {
  db.query('SELECT * FROM notes', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return
    }
    res.json(results);
  })
}

const getNotesByUserId = (req, res) => {
  const userId = req.params.userId;

  db.query('SELECT * FROM notes WHERE user_id = ?', [userId], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return
    };
    res.json(results);
  })
}

const createNote = (req, res) => {
  // console.log('endpoint console', req.body)
  const { user_id, title, text } = req.body;

  if (!user_id || !title || !text) {
    return res.status(400).json({ error: 'user_id, title, and text are required' });
  }

  db.query( 'INSERT INTO notes (user_id, title, text) VALUES (?, ?, ?)', [user_id, title, text],
  (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ note_id: results.insertId, user_id, title, text });
  })
}

const deleteNote = (req, res) => {
  const { userId, noteId } = req.params;

  if (!userId || !noteId) {
    return res.status(400).json({ error: 'userId and noteId are required' });
  }

  db.query('DELETE FROM notes WHERE note_id = ?', [noteId], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.status(204).send();
  })
}

const updateNoteDeleteStatus = (req, res) => {
  const noteId = req.params.noteId;

  db.query('SELECT * FROM notes WHERE note_id = ?', [noteId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const note = results[0];
    let noteDeletedValue = 0;

    if(note.deleted == 0) { noteDeletedValue = 1 }

    db.query(
      `UPDATE notes SET deleted = ? WHERE note_id = ?`, [noteDeletedValue, noteId], (err, results) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Note updated successfully', noteId });
      }
    )
  })
}

module.exports = {
  getAllNotes,
  getNotesByUserId,
  createNote,
  deleteNote,
  updateNoteDeleteStatus
}