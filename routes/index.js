//===== Import ======//
const router = require('express').Router();
const notes = require('./notes');

// go to notes.js when it sees api/notes
router.use('/notes', notes);

module.exports = router;
