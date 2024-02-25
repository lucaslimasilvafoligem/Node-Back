const path = require('path');

console.log(path.resolve('teste.txt'));

const midFolder = 'relatorios';
const filename = 'arq.txt';

const finalPath = path.join('/', 'arquivos', midFolder, filename);

console.log(finalPath);
