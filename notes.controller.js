const fs = require('fs/promises')
const path = require('path')

const notesPath = path.join(__dirname, 'db.json')

const chalk = require("chalk")
async function addNote(title) {

    const notes = await getNotes()
    const note = {
        title,
        id: Date.now().toString()
    }
    notes.push(note)

    await fs.writeFile(notesPath, JSON.stringify((notes)))
    console.log(chalk.bgGreen('Заметка добавлена'))
}


async function getNotes() {
    const notes = await fs.readFile(notesPath, {encoding: 'utf-8'})
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function removeNote(id) {
    const allNotes = await getNotes()

    const filteredNotes = allNotes.filter((note) => note.id !== id)
    console.log('filteredNotes', filteredNotes)


    await fs.writeFile(notesPath, JSON.stringify(filteredNotes, null, 2), (err) => {
            if (err) {
                console.error('Ошибка записи файла:', err);
                return;
            }
        })
        console.log(`Объект с id ${id} был удален.`)



}

async function printNotes() {
    const notes = await getNotes()
    console.log(chalk.bgBlue('Вот лист записок:'))
    notes.forEach( note => {
        console.log(chalk.blue(note.id, note.title ))})

}

async function updateNotes(id, newTitle) {
    const notes = await getNotes()
    const noteIndex = notes.findIndex(note => note.id === id)

    if (noteIndex === -1) {
        throw new Error(`Запись с id "${id}" не найдена`)
    }

    if (!notes[noteIndex]) {
        throw new Error(`Id ${noteIndex} не правильный! Возможно Id не существует.`)
    }

    notes[noteIndex].title = newTitle
    await fs.writeFile(notesPath, JSON.stringify(notes, null, 2))
    return notes[noteIndex]
}

module.exports = {
    addNote, getNotes, updateNotes, removeNote, printNotes
}