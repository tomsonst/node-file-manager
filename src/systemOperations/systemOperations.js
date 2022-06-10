import os from 'os';
import { printCurrentDirectory } from '../utils.js';

export const getOsInformation = (data) => {
  const command = data.split(' ')[1];
  switch (command){
    case '--EOL':
      getOsEOL();
      break;
    case '--cpus':
      getCpuInfo();
      break;
    case '--homedir':
      getHomeDirectory();
      break;
    case '--username':
      getCurrentUserName();
      break;
    case '--architecture':
      getCpuArchitecture();
      break;
    default:
      console.log('Operation failed');
  }
}

const getOsEOL = () => {
  console.log(JSON.stringify(os.EOL));
  printCurrentDirectory();
}

const getCpuInfo = () => {
  const cpuInfo = os.cpus();
  const changedInfo = [];
  cpuInfo.forEach((item) => {
    const cpuModel = item.model.split(' @ ')[0];
    const cpuSpeed = item.model.split(' @ ')[1];
    const newCpuInfo = {
      model: cpuModel,
      speed: cpuSpeed
    }
    changedInfo.push(newCpuInfo);
  })
  console.log(changedInfo);
  printCurrentDirectory();
}

const getHomeDirectory = () => {
  console.log(os.userInfo().homedir);
  printCurrentDirectory();
}

const getCurrentUserName = () => {
  console.log(os.userInfo().username);
  printCurrentDirectory();
}

const getCpuArchitecture = () => {
  console.log(process.arch);
  printCurrentDirectory();
}

