const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;

const folderPath = path.join(__dirname, 'project-dist');
const styleFolderPath = path.join(__dirname, 'styles');
const styleFilePath = path.join(folderPath, 'style.css');
const html = path.join(folderPath, 'index.html');
const components = path.join(__dirname, 'components');
const template = path.join(__dirname, 'template.html');
const assetsFolderPath = path.join(__dirname, 'assets');
const newAssetsFolderPath = path.join(folderPath, 'assets');

async function createBuilder() {
  try {
    mkFolder(folderPath);
    copy(assetsFolderPath, newAssetsFolderPath);
    merge(styleFolderPath, styleFilePath);
    insert(components, html, template);
  } catch(err) {
    console.log(err);
  }
}

async function mkFolder(path) {
  fsPromises.mkdir(path, { recursive: true }, (err => {
    if(err) throw err;
  }));
}

async function copy(fromDir, toDir) {
  try {
    await fs.promises.rm(toDir, { force: true, recursive: true }, (err => {
      if(err) throw err;
    }));
    await fsPromises.mkdir(toDir, { recursive: true });
    
    const files = await fsPromises.readdir(fromDir, { withFileTypes: true });
    for (let file of files) {
      const filePath = path.join(fromDir, file['name']);
      const copyFilePath = path.join(toDir, file['name']);
      if (file.isFile()) {
        await fsPromises.copyFile(filePath, copyFilePath);
      } else {
        await fsPromises.mkdir(copyFilePath, { recursive: true });
        await copy(filePath, copyFilePath);
      }
    }
  } catch(err) {
    console.log(err);
  }
}

async function merge(fromDir, toDir) {
  try {
    let result = [];
    const files = await fsPromises.readdir(fromDir, { withFileTypes: true });

    for (let file of files) {
      const filePath = path.join(fromDir, file['name']);
      const fileType = path.extname(filePath);

      if (file.isFile() && fileType === '.css') {
        const cssStyles = await fsPromises.readFile(filePath, 'utf-8');
        result.push(`${cssStyles} \n`);
      }
    }
    await fsPromises.writeFile(toDir, result);
  } catch(err) {
    console.log(err);
  }
}

async function insert(fromDir, toDir, template) {
  try {
    let html = await fsPromises.readFile(template, 'utf-8');
    const files = await fsPromises.readdir(fromDir, { withFileTypes: true });
    for (let file of files) {
      const fileContent = await fsPromises.readFile(
        path.join(components, `${file['name']}`), 'utf-8');
      const regExp = new RegExp(`{{${file.name.split('.')[0]}}}`, 'g');
      html = html.replace(regExp, fileContent);
    }
    await fsPromises.writeFile(toDir, html);
  } catch(err) {
    console.log(err);
  }
}

createBuilder();