const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../model/Notes');
const { body, validationResult } = require('express-validator');

// ROUT 1 : Get all notes of loggedin user GET -> /api/notes/fetchallnotes. Login Require
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.status(200).json(notes)
    } catch (err) {
        // catching unknown erros
        console.error(err);
        res.status(500).send("Internal Server Error")
    }
});

// ROUT 2 : Adda new note using POST -> /api/notes/addnote. Login Require
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Enter a valid description').isLength({ min: 5 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() });
        }

        const note = new Notes({
            title, description, tag, user: req.user.id
        })

        const saveNote = await note.save();
        res.status(200).json(saveNote)
    } catch (err) {
        // catching unknown erros
        console.error(err);
        res.status(500).send("Internal Server Error")
    }

});

module.exports = router