import process from 'process';
import path from 'path';

export const printCurrentDirectory = () => console.log(`You are currently in ${process.cwd()}`)

export const convertedToAbsolutePath = (filePath) => {
  try {
    if(filePath.startsWith('C') || filePath.startsWith('c')){
      return  path.join(filePath);
    } else {
      return path.join(process.cwd(),filePath);
    }
  } catch {
    console.log('Operation failed');
  }
}