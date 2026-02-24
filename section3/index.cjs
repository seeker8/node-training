const yargs = require('yargs');
const chalk = require('chalk');
const { getNotes, addNote } = require('./notes.cjs');

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
  handler: function (argv) {
    addNote(argv.title, argv.body);
  }
});

// Create remove command
yargs.command({
  command: 'remove',
  description: 'Remove a new note',
  handler: function () {
    console.log('Note Removed');
  }
});

// Create read command
yargs.command({
  command: 'read',
  description: 'Read a new note',
  handler: function () {
    console.log('Note');
  }
});

// Create list command
yargs.command({
  command: 'list',
  description: 'List notes',
  handler: function () {
    console.log('Listing notes...');
  }
});

yargs.parse();
