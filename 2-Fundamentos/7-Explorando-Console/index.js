const { count } = require("console");

// Mais de um valor
const a = 1;
const b = 'Texto';
const c = [1, 2];

console.log(a, b, c);

// Contagem
console.count('Valor de a é: ' + a);
console.count('Valor de a é: ' + a);
console.count('Valor de a é: ' + a);
console.count('Valor de a é: ' + a);
console.count('Valor de a é: ' + a);

// Variavel entre string
console.log("O nome é %s", b);

// Clear
setTimeout(() =>{
    console.clear();
}, 2000)

