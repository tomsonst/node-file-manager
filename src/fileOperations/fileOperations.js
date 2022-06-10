import process from 'process';
import path from 'path';
import fs from 'fs';
import { printCurrentDirectory, convertedToAbsolutePath } from '../utils.js';

export const readFile = async (data) => {
  try{
    const filePath = convertedToAbsolutePath(data.split(' ')[1]);
    if(!fs.existsSync(filePath)){
      throw new Error('exception');
    }
    const readedFile = fs.createReadStream(filePath);

    readedFile.on('data', (chunk) => {
      process.stdout.write(chunk);
    });
    readedFile.on('end', () => {
      console.log('\n');
      printCurrentDirectory();
    })
  } catch {
    console.log('Operation failed');
  }
}

export const createNewFile = (data) => {
  try{
    const newFileName = data.split(' ')[1];
    if(!newFileName){
      throw new Error('exception')
    }

    fs.appendFile(newFileName, '', () => {});
    printCurrentDirectory();
  } catch {
    console.log('Operation failed');
  }
}

export const renameFile = (data) => {
  try{
    const currentFileName = data.split(' ')[1];
    const newFileName = data.split(' ')[2];

    if(!fs.existsSync(currentFileName) || !currentFileName || !newFileName){
      throw new Error('exception')
    }

    fs.rename(currentFileName, newFileName, () => {});
    printCurrentDirectory();
  } catch {
    console.log('Operation failed');
  }
}

export const copyFile = async (data) => {
  try{
    const copiedFilePath = convertedToAbsolutePath(data.split(' ')[1]);
    const copiedFileNameArr = copiedFilePath.split('\\');
    const copiedFileName = copiedFileNameArr[copiedFileNameArr.length - 1];
    const newFolderPath = convertedToAbsolutePath(data.split(' ')[2]);

    if(!fs.existsSync(copiedFilePath) || !fs.existsSync(newFolderPath)){
      throw new Error('exception')
    }
    
    const newFilePath = path.join(newFolderPath, copiedFileName);
    await fs.writeFile(newFilePath, '', () => {});

    const readedFile = fs.createReadStream(copiedFilePath);
    const writeFile = fs.createWriteStream(newFilePath);

    readedFile.on('data', (chunk) => {
      writeFile.write(chunk);
    });

    readedFile.on('close', () => {
      writeFile.end();
    });

    printCurrentDirectory();
  } catch {
    console.log('Operation failed');
  }
}

export const moveFile = async (data) => {
  try{
    const copiedFilePath = convertedToAbsolutePath(data.split(' ')[1]);
    const copiedFileNameArr = copiedFilePath.split('\\');
    const copiedFileName = copiedFileNameArr[copiedFileNameArr.length - 1];
    const newFolderPath = convertedToAbsolutePath(data.split(' ')[2]);

    if(!fs.existsSync(copiedFilePath) || !fs.existsSync(newFolderPath)){
      throw new Error('exception')
    }
    
    const newFilePath = path.join(newFolderPath, copiedFileName);
    await fs.writeFile(newFilePath, '', () => {});
    
    const readedFile = fs.createReadStream(copiedFilePath);
    const writeFile = fs.createWriteStream(newFilePath);

    readedFile.on('data', (chunk) => {
      writeFile.write(chunk);
    });

    readedFile.on('close', () => {
      fs.unlink(copiedFilePath, () => {})
      writeFile.end();
    });

    printCurrentDirectory();
  } catch {
    console.log('Operation failed');
  }
}

export const deleteFile = (data) => {
  try {
    const filePath = convertedToAbsolutePath(data.split(' ')[1]);
    if(!fs.existsSync(filePath)) throw new Error('exception')

    fs.unlink(filePath, () => {});
    printCurrentDirectory();
  } catch {
    console.log('Operation failed');
  }
}