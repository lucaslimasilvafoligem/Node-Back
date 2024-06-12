import _ from 'lodash';
import chalk from 'chalk';

const a = [1, 3, 4, 5];
const b = [2, 4];

const diff = _.difference(a, b);

console.log(chalk.bgRed.bold(diff));
