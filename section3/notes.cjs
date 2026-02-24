const fs = require('fs');
const chalk = require('chalk');


const getNotes = () => {
  return 'Your notes...';
}

const addNote = (title, body) => {
  const notes = loadNotes();
  const filtered = notes.filter(note => note.title === title);
  if (filtered.length === 0) {
    notes.push({ title, body });
    saveNotes(notes);
    console.log(chalk.bgGreen('New Note added!'));
  }
  else {
    console.log(chalk.bgRed('Note title taken!'));
  }
}

const removeNote = (title) => {
  const notes = loadNotes();
  updatedNotes = notes.filter(note => note.title !== title);
  if (updatedNotes.length < notes.length) {
    saveNotes(updatedNotes);
    console.log(chalk.bgGreen('Notes updated successfuly!'));
  }
  else {
    console.log(chalk.bgRed('Note not found. Notes were not updated.'));
  }
}

const saveNotes = (notes) => {
  fs.writeFileSync('notes.json', JSON.stringify(notes));
}

const loadNotes = () => {
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