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
  addNote
};