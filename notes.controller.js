const chalk = require("chalk");
const Note = require("./models/note.js");

async function addNote(title) {
    await Note.create({ title });
    console.log(chalk.bgGreen("Заметка добавлена"));
    // const notes = await getNotes()
    // const note = {
    //     title,
    //     id: Date.now().toString()
    // }
    // notes.push(note)
    //
    // await fs.writeFile(notesPath, JSON.stringify((notes)))
}

async function getNotes() {
    const notes = await Note.find();
    return notes;
}

async function removeNote(id) {
    // const allNotes = await getNotes()
    //
    // const filteredNotes = allNotes.filter((note) => note.id !== id)
    //
    // console.log('filteredNotes', filteredNotes)
    //
    //
    // await fs.writeFile(notesPath, JSON.stringify(filteredNotes, null, 2), (err) => {
    //         if (err) {
    //             console.error('Ошибка записи файла:', err);
    //             return;
    //         }
    //     })

    await Note.deleteOne({ _id: id });
    console.log(`Объект с id ${id} был удален.`);
}

async function updateNotes(id, newTitle) {
    await Note.updateOne({ _id: id }, { title: newTitle });
    console.log(`Объект с id ${id} был изменен.`);

    // const notes = await getNotes()
    // const noteIndex = notes.findIndex(note => note.id === id)
    // if (noteIndex === -1) {
    //     throw new Error(`Запись с id "${id}" не найдена`)
    // }
    // if (!notes[noteIndex]) {
    //     throw new Error(`Id ${noteIndex} не правильный! Возможно Id не существует.`)
    // }
    // notes[noteIndex].title = newTitle
    // await fs.writeFile(notesPath, JSON.stringify(notes, null, 2))
    // return notes[noteIndex]
}

module.exports = {
    addNote,
    getNotes,
    updateNotes,
    removeNote,
};
