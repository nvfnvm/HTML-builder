const path = require('path');
const { promises: fs } = require('fs');
const pathFolder = path.join(__dirname, 'files');
const newPathFolder = path.join(__dirname, 'files-copy');

async function copyFolder (src, dest) {
  await fs.rm(path.join(newPathFolder), { force: true, recursive: true });
  await fs.mkdir(path.join(newPathFolder), { recursive: true });
  let elements = await fs.readdir(src, { withFileTypes: true });
  for (let element of elements) {
    let srcPath = path.join(src, element.name);
    let destPath = path.join(dest, element.name);
    if(element.isFile()) {
      await fs.copyFile(srcPath, destPath);
    } else {
      await fs.mkdir(destPath, { recursive: true })
      await copyFolder(path.join(src, element.name), path.join(dest, element.name));
    }
  }
}
copyFolder(pathFolder, newPathFolder);