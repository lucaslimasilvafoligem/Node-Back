const x = '10';

if (!Number.isInteger(x)) {
    throw new Error("Não é um número inteiro.");
}

console.log("Sem erro");
