// nome

console.log(process.argv);

const args = process.argv.slice(2);

console.log(args);

const nome = args[0].split('=')[1];

const profissao = args[1].split('=')[1];

console.log(nome);

console.log(profissao);

console.log("O nome é " + nome + " e a profissão é " + profissao);
