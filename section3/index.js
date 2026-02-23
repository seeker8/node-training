const fs = require('fs');

fs.writeFileSync('test.txt', 'hello world', (err) => {
  if (err) {
    throw err;
  }
  console.log('The file has been saved!');
});

fs.appendFileSync('test.txt', '\ntext appended', (err) => {
  if (err) {
    throw err
  }
  console.log('File was updated');
})