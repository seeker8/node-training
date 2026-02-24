const fs = require('fs');
const chalk = require('chalk');


function getNotes() {
  return 'Your notes...';
}

function addNote(title, body) {
  const notes = loadNotes();
  const filtered = notes.filter((note) => note.title === title);
  if (filtered.length === 0) {
    notes.push({ title, body });
    saveNotes(notes);
    console.log(chalk.green('New Note added!'));
  }
  else {
    console.log(chalk.red('Note title taken!'));
  }
}

function removeNote(title) {
  const notes = loadNotes();
  updatedNotes = notes.filter((note) => note.title !== title);
  if (updatedNotes.length < notes.length) {
    saveNotes(updatedNotes);
    console.log(chalk.green('Notes updated successfuly!'));
  }
  else {
    console.log(chalk.yellow('The title entered was not found. Notes were not updated.'));
  }
}

function saveNotes(notes) {
  fs.writeFileSync('notes.json', JSON.stringify(notes));
}

function loadNotes() {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    return JSON.parse(dataBuffer.toString());
  } catch (e) {
    return [];
  }
}


module.exports = {
  getNotes,
  addNote,
  removeNote
};