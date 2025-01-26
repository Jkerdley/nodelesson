
const {addNote, printNotes, removeNote, updateNotes} = require('./notes.controller')
const yargs = require('yargs')
const pkg = require('./package.json')
const chalk = require("chalk");

yargs.version(pkg.version)

yargs.command({
    command: 'add',
    describe: 'Add new note',
    builder: {
        title: {
            type: 'string',
            describe: 'Note title',
            demandOption: true,
        }
    },
    handler({title}) {
       addNote(title)
    }
})

yargs.command({
    command: 'list',
    describe: 'Print all notes',
    async handler() {
      const notes = await printNotes()
    },
})

yargs.command({
    command: 'remove',
    describe: 'Remove note by id',
    async handler(removeId) {
        const stringedId = removeId.id.toString()
        console.log('removeId, stringedId', removeId, stringedId)
        const deletedNote = await removeNote(stringedId)
    },
})

yargs.command({
    command: 'edit',
    describe: 'Edit note by id',
    builder: {
        id: {
            type: 'string',
            describe: 'Note ID',
            demandOption: true
        },
        title: {
            type: 'string',
            describe: 'New note title',
            demandOption: true
        }
    },
    async handler({id, title}) {
        try {
            const updatedNote = await updateNotes(id, title)
            console.log(chalk.bgBlueBright('Запись обновлена:'), updatedNote)
        } catch (e) {
            console.error('Ошибка:', e.message)
        }
    },
})

yargs.parse()