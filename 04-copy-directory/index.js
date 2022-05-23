const path = require('path');
const { promises: fs } = require('fs');
const pathFolder = path.join(__dirname, 'files');
const newPathFolder = path.join(__dirname, 'files-copy');

async function copyFolder (src, dest) {
  await fs.mkdir(dest, { recursive: true });
  let elements = await fs.readdir(src, { withFileTypes: true });
  for (let element of elements) {
    let srcPath = path.join(src, element.name);
    let destPath = path.join(dest, element.name);
    if(element.isDirectory()) {
      await copyFolder(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
}
copyFolder(pathFolder, newPathFolder);