const validator = require('validator');
const getNotes = require('./notes.cjs');


console.log(getNotes());

console.log(validator.isEmail('test@test.com'));
console.log(validator.isURL('https://node.org'));