const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});

readline.question(`Linguagem favorita? `, (language) => {
    console.log(`Você escolheu: ${language}`);
    readline.close();
});
