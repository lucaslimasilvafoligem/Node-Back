import express from 'express';
import { engine } from 'express-handlebars';
import mysql from 'mysql';

const app = express();
const port = 3000;

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.static('public'));

// Configuração do banco de dados
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'lucas2112', // Certifique-se de usar a senha correta
    database: 'nodemysql1',
});

// Função privada para criar a tabela book se não existir
const _createBookTable = () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS book (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(250) NOT NULL,
            author VARCHAR(255) NOT NULL,
            pages INT NOT NULL,
            launch_date DATE
        )
    `;

    conn.query(sql, (err, result) => {
        if (err) {
            console.error('Erro ao criar a tabela:', err);
            return;
        }

        console.log('Tabela book criada com sucesso');
    });
};

// Conectar ao banco de dados e criar a tabela se não existir
conn.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
        return;
    }

    console.log('Conectou ao MySql');

    // Chamar a função para criar a tabela book
    _createBookTable();
});

app.get('/', (req, res) => {
    res.render('home');
});

// Inicializar o servidor
app.listen(port, () => {
    console.log(`App rodando na porta ${port}`);
});
