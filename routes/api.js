const api = require('express').Router()
const generateUniqueId = require('generate-unique-id');
const { readFromFile, readAndAppend } = require('../helpers/fsHelper')

// GET route to retrieve stored notes
api.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
})

// POST route to submit notes
api.post('/', (req, res) => {
    // res.send('post')
    const { title, text } = req.body
   // check if both, title and text were filled out
    if (title && text) {
        const newNote = {
            title, 
            text, 
            id: generateUniqueId({length: 6})
        }
        console.log(title, text)
        readAndAppend(newNote, './db/db.json')
        res.json('Note added succesfully')
    } else {
        res.json('Error in adding the note')
    }
})
  

// Bonus delete: should receive a query parameter containing the id of a note to delete. In order to delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.
api.delete('/:id', (req, res) => {
    // res.send('delete')
    const id = req.query.id
    readFromFile('./db/db.json')

})


module.exports = api