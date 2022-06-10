import zlib from 'zlib';
import fs from 'fs';
import { printCurrentDirectory, convertedToAbsolutePath } from '../utils.js';

export const compressFile = (data) => {
  try {
    const filePath = convertedToAbsolutePath(data.split(' ')[1]);
    const destinationPath = convertedToAbsolutePath(data.split(' ')[2]);

    if(!fs.existsSync(filePath) || !fs.existsSync(destinationPath)) {
      throw new Error('exception');
    }

    const fileNameArr = filePath.split('\\');
    const fileName = fileNameArr[fileNameArr.length - 1]

    const brotliArchive = zlib.createBrotliCompress();

    const readedFile = fs.createReadStream(filePath);
    const writedArchive = fs.createWriteStream(destinationPath + '\\' + fileName + '.gz');

    readedFile.pipe(brotliArchive).pipe(writedArchive);
    printCurrentDirectory();
  } catch {
    console.log('Operation failed');
  }
};

export const decompressFile = (data) => {
  try {
    const filePath = convertedToAbsolutePath(data.split(' ')[1]);
    const destinationPath = convertedToAbsolutePath(data.split(' ')[2]);

    if(!fs.existsSync(filePath)) {
      throw new Error('exception');
    }

    const fileNameArr = filePath.split('\\');
    const fileName = fileNameArr[fileNameArr.length - 1].slice(0, -3);

    const brotliArchive = zlib.createBrotliDecompress();
    const readedFile = fs.createReadStream(filePath);
    const writedArchive = fs.createWriteStream(destinationPath + '\\' + fileName);

    readedFile.pipe(brotliArchive).pipe(writedArchive);
    printCurrentDirectory();
  } catch {
    console.log('Operation failed');
  }
}