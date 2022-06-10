import crypto from 'crypto';
import fs from 'fs';
import { convertedToAbsolutePath, printCurrentDirectory } from '../utils.js';

export const calculateHash = (data) => {
  try {
    const filePath = convertedToAbsolutePath(data.split(' ')[1]);

    if(!fs.existsSync(filePath)){
      throw new Error('exception')
    }

    fs.readFile(filePath, 'utf8', (err, data) => {
      const hash = crypto.createHash('sha256').update(data).digest('hex');
      console.log(hash);
      printCurrentDirectory();
    });
  } catch {
    console.log('Operation failed');
  }
}