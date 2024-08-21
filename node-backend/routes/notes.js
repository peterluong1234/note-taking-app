const express = require('express');
const router = express.Router();
const { getNotesByUserId, getAllNotes } = require('../controllers/noteController');

router.get('/:userId', getNotesByUserId);
router.get('/', getAllNotes);

module.exports = router;