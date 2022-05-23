const fs = require('fs');
const path = require('path');
const pathDir = path.join(__dirname, 'project-dist');
const stylesDir = path.join(__dirname, 'styles');
const ws = fs.createWriteStream(path.join(pathDir, 'bundle.css'));

fs.readdir(stylesDir, {withFileTypes: true}, (err, data) => {
  if (err) throw err;
  data.forEach((file) => {
    const ext = path.extname(path.join(stylesDir, file.name));
    if(file.isFile() && ext === '.css') {
      const readStream = fs.createReadStream(path.join(stylesDir, file.name));
      readStream.pipe(ws);
    }
  });
});
