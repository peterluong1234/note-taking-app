const express = require('express');
const router = express.Router();
const { getNotesByUserId, getAllNotes, createNote, deleteNote, updateNoteDeleteStatus, updateNote } = require('../controllers/noteController');

router.get('/:userId', getNotesByUserId);
router.get('/', getAllNotes);
router.post('/', createNote);
router.delete('/:userId/:noteId', deleteNote);
router.put('/toggle_deleted/:noteId', updateNoteDeleteStatus);
router.put('/:noteId', updateNote);

module.exports = router;