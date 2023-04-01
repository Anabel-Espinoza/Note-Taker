const notes = require('express').Router
const generateUniqueId = require('generate-unique-id');

// GET route to retrieve stored notes
notes.get('/api/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
})

// POST route to submit notes
notes.post('/api/notes', (req, res) => {
    const { title, text } = req.body
    // check if both, title and text were filled out?
    const newNote = {
        title, 
        text, 
        uniqueID: generateUniqueId({length: 6})
    }
    console.log(title, text)
    
    // CREATE function to append newNote into db.json file
})


module.exports = notes