import process from 'process';
import os from 'os';
import * as readline from 'readline';
import { stdin as input, stdout as output } from 'node:process';
import { upNavigation, cdNavigation, printContentFolder } from './navigation/navigation.js';
import { readFile, createNewFile, renameFile, copyFile, moveFile, deleteFile } from './fileOperations/fileOperations.js';
import { printCurrentDirectory } from './utils.js';
import { getOsInformation } from './systemOperations/systemOperations.js';
import { calculateHash } from './hashOperation/hashCalculate.js';
import { compressFile, decompressFile } from './compressOperations/compress.js';


const userName = process.argv[2].split('=')[1];
const userHomeDir = os.homedir();

process.chdir(userHomeDir);

console.log(`Welcome to the File Manager, ${userName}!\n`);

printCurrentDirectory();

const rl = readline.createInterface({ input, output });

rl.on('line', (data) => {
  const command = data.split(' ')[0];
  switch(command){
    case 'up':
      upNavigation();
      break;
    case 'cd':
      cdNavigation(data);
      break;
    case 'ls':
      printContentFolder();
      break;
    case 'cat':
      readFile(data);
      break;
    case 'add':
      createNewFile(data);
      break;
    case 'rn':
      renameFile(data);
      break;
    case 'cp':
      copyFile(data);
      break;
    case 'mv':
      moveFile(data);
      break;
    case 'rm':
      deleteFile(data);
      break;
    case '.exit':
      rl.close();
      break;
    case 'os':
      getOsInformation(data);
      break;
    case 'hash':
      calculateHash(data);
      break;
    case 'compress':
      compressFile(data);
      break;
    case 'decompress':
      decompressFile(data);
      break;
    default:
      console.log('Invalid input');
  }
});

rl.on('close', () => { console.log(`Thank you for using File Manager, ${userName}!`)})

