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

module.exports = {
  getAllNotes,
  getNotesByUserId,
}