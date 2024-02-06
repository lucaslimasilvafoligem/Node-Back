const fs = require('fs');

console.log("O inicio");

fs.writeFile('texto.txt', 'textinho', function(err) {
    setTimeout(function() {
        console.log("Arquivo criadoooooo");
    }, 1000);
});
 
console.log("O fim");
