import inquirer from 'inquirer';

inquirer.prompt([
{
    name: 'p1',
    message: 'Nota1?'
}, {
    name: 'p2',
    message: 'Nota2?'
}
]).then((answers) => {
    console.log(answers);
    console.log((parseFloat(answers.p1) + parseFloat(answers.p2))/2);
}).catch(err => console.log(err));
