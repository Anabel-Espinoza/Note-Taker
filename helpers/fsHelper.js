const fs = require('fs')
const util = require('util')

const readFromFile = util.promesify(fs.readFile)


const writeToFile = (destination, content) =>
    fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err 
        ? console.error(err)
        : console.info(`Data written to ${destination}`)
)

const readAndAppend = (newData, file) => {
    fs.readFile(file, 'uft8', (err, data) => {
        if (err) {
            console.error(err)
        } else {
            const dataInFile = JSON.parse(data)
            dataInFile.push(newData)
            writeToFile(file, dataInFile)
        }
    })
}

module.exports = { readFromFile, writeToFile, readAndAppend }