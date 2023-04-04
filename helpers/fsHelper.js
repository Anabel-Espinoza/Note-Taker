const fs = require('fs')
const util = require('util')

const readFromFile = util.promisify(fs.readFile)
/**
 *  Function to write data to the JSON file given a destination and some content
 *  @param {string} destination The file you want to write to.
 *  @param {object} content The content you want to write to the file.
 *  @returns {void} Nothing
 */

const writeToFile = (destination, content) =>
    fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err 
        ? console.error(err)
        : console.info(`Data written to ${destination}`)
)

const readAndAppend = (newData, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
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