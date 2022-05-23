const fs = require('fs');
const path = require('path');
const pathDirectory = path.join(__dirname, 'text.txt');
const output = fs.createWriteStream(pathDirectory);
const { stdin, stdout, exit } = require('process');

stdout.write('Hello Rs-student, enter your message in console \n');
stdin.on('data', data => {
  const message = data;
  if(message.toString().trim() !== 'exit') {
    output.write(message);
  } else {
    stdout.write('C u, bye :)');
    exit();
  }
});

process.on('SIGINT', function () {
  stdout.write('C u, bye :)');
  exit();
});