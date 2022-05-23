const fs = require('fs');
const path = require('path');
const pathDirectory = path.join(__dirname, 'secret-folder');

fs.readdir(pathDirectory, {withFileTypes: true}, (err, data) => {
  if(err) throw err;
  data.forEach(el => {
    if(el.isFile()) {
      const pathEl = path.join(pathDirectory, el.name);
      const ext = path.extname(el.name);
      const fileName = path.parse(el.name).name;
      fs.stat(pathEl, (err, stats) => {
        if(err) throw err;
        console.log(`${fileName} - ${ext.slice(1)} - ${stats.size} `);
      });
    }
  });
});