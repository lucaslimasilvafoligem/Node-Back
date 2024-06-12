import express from 'express';
import { engine } from 'express-handlebars';
import mysql from 'mysql';

const app = express();
const port = 3000;

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.static('public'));

app.use(
    express.urlencoded({
        extended: true
    }),
);

app.use(express.json());

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
localhost:3000
app.get('/', (req, res) => {
    res.render('home');
});

app.post('/books/insertbook', (req, res) => {
    const { title, author, pages, launch_date } = req.body;

    if (!title || !author || !pages || !launch_date) {
        return res.status(400).send('Todos os campos são obrigatórios.');
    }

    const query = `INSERT INTO book (title, author, pages, launch_date) VALUES (?, ?, ?, ?)`;

    conn.query(query, [title, author, pages, launch_date], (err, result) => {
        if (err) {
            console.error('Erro ao inserir o livro:', err);
            res.status(500).send('Erro ao inserir o livro.');
            return;
        }

        console.log('Livro inserido com sucesso');
        res.redirect('/');
    });
});

app.get('/books', (req, res) => {
    const sql = "SELECT * FROM book";

    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err);
            return;
        }

        const books = data.map(book => ({
            ...book,
            launch_date: new Date(book.launch_date).toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' })
        }));

        console.log(books);

        res.render('books', { books });
    });
});

app.get('/book/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM book WHERE id = ?";

    conn.query(sql, [id], function (err, data) {
        if (err) {
            console.log(err);
            return;
        }

        if (data.length === 0) {
            res.status(404).send('Livro não encontrado');
            return;
        }

        const book = {
            ...data[0],
            launch_date: new Date(data[0].launch_date).toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' })
        };

        console.log(book);

        res.render('book', { book });
    });
});

// Inicializar o servidor
app.listen(port, () => {
    console.log(`App rodando na porta ${port}`);
});
