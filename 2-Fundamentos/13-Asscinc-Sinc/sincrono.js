const fs = require('fs');

console.log("O inicio");

fs.writeFileSync('texto.txt', 'textinho');

console.log("O fim");
