// módulos externos
import inquirer from 'inquirer';
import chalk from 'chalk';

// módulos internos
import fs from 'fs';

operations();

function operations() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'O que deseja fazer?',
            choices: ['Criar Conta', 'Consultar Saldo', 'Depositar', 'Sacar', 'Sair']
        },
    ])
    .then((answer) => {

        const action = answer['action'];

        console.log(action);

        if (action === 'Criar Conta') {
            createAccount();
        } else if (action === 'Consultar Saldo'){
            getAccountBalance();
        } else if (action === 'Depositar') {
            deposit();
        } else if (action === 'Sacar') {
            withdraw();
        } else if (action === 'Sair') {
            console.log(chalk.bgBlue.black('Obrigado por usar o Accounts'));
            process.exit();
        }
    })
    .catch((err) => console.log(err));
}

function createAccount() {
    console.log(chalk.bgGreen.black('Parabéns por escolher o nosso banco'));
    console.log(chalk.green('Defina as opções da sua conta a seguir'));

    buildAccount();
}

function buildAccount() {
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Digite um nome para a sua conta'
        }
    ]).then((answer) => {
        const accountName = answer['accountName'];

        console.log(accountName);

        if (!fs.existsSync('accounts')) {
            fs.mkdirSync('accounts');
        }

        if (fs.existsSync(`accounts/${accountName}.json`)) {
            console.log(
                chalk.bgRed.black('Esta conta já existe, escolha outro nome')
            );

            buildAccount();
            return;
        }

        fs.writeFileSync(
            `accounts/${accountName}.json`,
            '{"balance": 0}'
        );

        console.log(chalk.green('Parabéns, sua conta foi criada'));
    })
    .catch((err) => console.log(err));
}

function deposit() {
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Insira o nome da conta'
        }
    ])
    .then((answer) => {

        const accountName = answer['accountName']

        if (!checkAccount(accountName)) {
            return deposit();
        }
         
        inquirer.prompt([
            {
                name: 'amount',
                message: 'Quanto você deseja depositar'
            }
        ])
        .then((answer) => {

            const amount = answer['amount']
            
            addAmount(accountName, amount);
            operations();
        })
        .catch((err) => console.log(err))
    })
    .catch((err) => console.log(err))
}

function checkAccount(accountName) {
    if (!fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(chalk.bgRed.black('Esta conta não existe, escolha outro nome.'));
        return false;
    }
    
    return true;
}

function addAmount(accountName, amount) {
    const accountData = getAccount(accountName)

    if (!amount || amount <= 0) {
        console.log(chalk.bgRed.black('Ocorreu um erro'));
        
        return deposit();
    }

    console.log(accountData);
    accountData.balance = parseFloat(amount) + parseFloat(accountData.balance)

    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData),
        function (err) {
            console.log(err);
        },
    )

    console.log(chalk.green(`Foi depositado o valor de R$${amount} na sua conta!`));
}

function getAccount(accountName) {
    const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
        encoding:'utf8',
        flag: 'r'
    })

    return JSON.parse(accountJSON);
}

function getAccountBalance() {
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Insira o nome da conta'
        }
    ])
    .then((answer) => {
      const accountName = answer['accountName'];

      if (!checkAccount(accountName)) {
        return getAccountBalance(); 
      }

      const accountData = getAccount(accountName);

      console.log(chalk.bgBlue.black(
        `Olá, o saldo da sua conta é de R$${accountData.balance}`
      ));

      operations();

    })
    .catch((err) => console.log(err))
}

function withdraw() {
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Insirá o nome da conta'
        }
    ])
    .then((answer) => {
        const accountName = answer['accountName'];

        if (!checkAccount(accountName)) {
            return withdraw();
        }

        const accountData = getAccount(accountName);

        inquirer.prompt([
            {
                name:'amount',
                message: 'Quanto deseja sacar?'
            }
        ]).then((answer) => {
            const amount = answer['amount'];

            if (!amount || amount <= 0) {
                console.log(chalk.bgRed.black('Ocorreu um erro'));
                
                return withdraw();
            }

            if (accountData.balance < amount) {
                console.log(chalk.bgRed.black('Saldo insuficiente'));

                return withdraw();
            }

            console.log(accountData);
            accountData.balance = parseFloat(accountData.balance) - parseFloat(amount);

            fs.writeFileSync(
                `accounts/${accountName}.json`,
                JSON.stringify(accountData),
                function (err) {
                    console.log(err);
                },
            )

            operations();

        }).catch((err) => console.log(err))
    })
    .catch((err) => console.log(err));
}
