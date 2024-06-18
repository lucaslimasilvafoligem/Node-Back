import express from 'express';
import { engine } from 'express-handlebars';
import conn from './db/index.mjs';
import User from './models/User.mjs';

const app = express();
const port = 3000;

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rota para exibir o formulário de criação de usuário
app.get('/users/create', (req, res) => {
    res.render('adduser');
});

// Rota para listar os usuários
app.get('/', async (req, res) => {
    const users = await User.findAll({ raw: true });
    console.log(users);
    res.render('home', { users });
});

// Rota para criar um novo usuário
app.post('/users/create', async (req, res) => {
    const { name, occupation } = req.body;
    let newsletter = req.body.newsletter;

    newsletter = newsletter === 'on';

    await User.create({ name, occupation, newsletter });

    res.redirect('/');
});

app.get('/users/:id', async (req, res) => {
    const id = req.params.id;

    const user = await User.findOne({raw: true, where: {id: id}});

    res.render('userview', { user });
});

app.post('/users/delete/:id', async (req, res) => {
    const id = req.params.id;

    await User.destroy( {where: {id: id}} );

    res.redirect('/');
});

conn
    .sync()
    .then(() => {
        app.listen(port, () => {
            console.log(`App rodando na porta ${port}`);
        });
    })
    .catch((err) => console.log(err));
