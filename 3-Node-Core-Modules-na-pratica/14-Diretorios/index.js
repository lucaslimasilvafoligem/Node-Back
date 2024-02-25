const fs = require('fs');

if (!fs.existsSync('./pasta')) {
    console.log("Não existe");
}

fs.mkdirSync('pasta');

if (fs.existsSync('./pasta')) {
    console.log("Existe");
}
