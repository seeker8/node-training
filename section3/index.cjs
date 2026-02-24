const yargs = require('yargs');
const { addNote, removeNote, listNotes, getNote } = require('./notes.cjs');

// Create add command
yargs.command({
  command: 'add',
  description: 'Add a new note',
  builder: {
    title: {
      describe: 'Note title',
      type: 'string',
      demandOption: true
    },
    body: {
      description: 'Note body',
      type: 'string',
      demandOption: true
    }
  },
  handler(argv) {
    addNote(argv.title, argv.body);
  }
});

// Create remove command
yargs.command({
  command: 'remove',
  description: 'Remove a new note',
  builder: {
    title: {
      description: 'Title of the note to be removed',
      type: 'string',
      demandCommand: true
    }
  },
  handler(argv) {
    removeNote(argv.title);
  }
});

// Create read command
yargs.command({
  command: 'read',
  description: 'Read a new note',
  builder: {
    title: {
      description: 'Title of the note to search',
      type: 'string',
      demandCommand: true
    }
  },
  handler(argv) {
    getNote(argv.title);
  }
});

// Create list command
yargs.command({
  command: 'list',
  description: 'List notes',
  handler() {
    listNotes();
  }
});

yargs.parse();
