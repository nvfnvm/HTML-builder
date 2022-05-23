const fs = require('fs');
const path = require('path');
const Stream = fs.createReadStream(path.join(__dirname, 'text.txt'));

Stream.on('data', (chunk) => {
  console.log(chunk.toString());
});