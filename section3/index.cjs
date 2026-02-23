const chalk = require('chalk');
const getNotes = require('./notes.cjs');

console.log(getNotes());
console.log(chalk.green('Sueccess'));
