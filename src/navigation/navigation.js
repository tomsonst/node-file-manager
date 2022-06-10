import path from 'path';
import fs from 'fs';
import { printCurrentDirectory } from '../utils.js';

export const upNavigation = () => {
  process.chdir(path.join(process.cwd(),'../'));
  printCurrentDirectory();
}

export const cdNavigation = (args) => {
  try{
    const newPath = args.split(' ')[1];
    if(newPath.startsWith('C') || newPath.startsWith('c')){
      process.chdir(newPath);
    } else {
      process.chdir(path.join(process.cwd(),newPath));
    }
    printCurrentDirectory();
  } catch {
    console.log('Operation failed');
  }
}

export const printContentFolder = () => {
  fs.readdir(process.cwd(), (err, files) => {
    const listFiles = [];
    files.forEach(file => {
      listFiles.push(file);
    });
    console.log(listFiles);
    printCurrentDirectory();
  });
}