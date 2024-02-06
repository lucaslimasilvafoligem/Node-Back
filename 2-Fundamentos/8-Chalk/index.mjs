import chalk from 'chalk';

const nota = 9;

if (nota >= 7) {
  console.log(chalk.green.bold("Parabéns"));
} else {
  console.log(chalk.bgRed.black("Final!"));
}
