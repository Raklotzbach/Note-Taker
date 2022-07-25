const fs = require('fs');
const app = require('express').Router();
const uuid = require('../helpers/uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');
const { response } = require('express');


// GET route for retreiving notes
app.get('/notes', (req, res) => {
    console.info(`${req.method} Request received for notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
})


// POST route for posting new note
app.post('/notes', (req, res) => {
    console.info(`${req.method} Request received to add new note`);
    console.log(req.body);

    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            noteId: uuid(),
        };

        readAndAppend(newNote, './db/db.json');

        const response = {
            status: "Success",
            body: newNote,
        };

        res.json(response);
    } else {
        res.json("Error posting Note");
    }
});



module.exports=app;