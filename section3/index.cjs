const chalk = require('chalk');
const getNotes = require('./notes.cjs');

const command = process.argv[2];

if (command === 'add') {
  console.log('Adding a note!');
}
else if (command === 'remove') {
  console.log('Removing a note!');
}