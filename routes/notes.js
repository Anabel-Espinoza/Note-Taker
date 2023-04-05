const notes = require('express').Router()
const generateUniqueId = require('generate-unique-id');
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsHelper')

// GET route to retrieve stored notes
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
})

// POST route to submit notes
notes.post('/', (req, res) => {
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
  
// DELETE specific id note
notes.delete('/:id', (req, res) => {
    // res.send('delete')
    const id = req.params.id
    console.log(id)
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const newArray = json.filter((note) => note.id !== id)
            writeToFile('./db/db.json', newArray)
            res.json(`Note ${id} has been deleted`)
        })
})

module.exports = notes