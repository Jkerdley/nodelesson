
const {addNote, printNotes, removeNote} = require('./notes.controller')
const yargs = require('yargs')
const pkg = require('./package.json')

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
    },
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
        const deletedNote = await removeNote(stringedId)
    },
})

yargs.parse()