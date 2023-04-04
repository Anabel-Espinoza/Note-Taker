const express = require('express')
const path = require('path')
const fs = require('fs')
const util = require('util')
const generateUniqueId = require('generate-unique-id');
const api = require('./routes/api.js')

const PORT = 3001
const app = express()

// Costum middleware?
app.use(express.json()) // allow to parse json info from body
app.use(express.urlencoded({ extended: true})) // access info from forms
app.use('/api/notes', api)

app.use(express.static('public'))

// ROUTE for homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

// ROUTE for notes page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
)