const api = require('express').Router()
const generateUniqueId = require('generate-unique-id');
const readFromFile = require('../helpers/fsHelper')

// GET route to retrieve stored notes
api.get('/', (req, res) => {
    res.send('get')
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data))) //NEED to add readFromFile in fs-helper.js
})

// POST route to submit notes
api.post('/', (req, res) => {
    res.send('post')
    const { title, text } = req.body
    // check if both, title and text were filled out
    if (title && text) {
        const newNote = {
            title, 
            text, 
            uniqueID: generateUniqueId({length: 6})
        }
        console.log(title, text)
    // CREATE function to append newNote into db.json file  

    }
})
    

// Bonus delete: should receive a query parameter containing the id of a note to delete. In order to delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.
api.delete('/:id', (req, res) => {
    res.send('delete')
})


module.exports = api