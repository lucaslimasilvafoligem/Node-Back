import express from 'express';
import { engine } from 'express-handlebars';
import conn from './db/index.mjs';
import User from './models/User.mjs';
import Address from './models/Address.mjs';

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

app.get('/users/edit/:id', async (req, res) => {
    const id = req.params.id;

    const user = await User.findOne( { raw: true, where: {id: id}} );

    res.render('useredit', { user });
});

app.post('/users/update', async (req, res) => {
    const {id, name, occupation} = req.body;

    let newsletter = req.body.newsletter;

    if (newsletter === 'on') {
        newsletter = true;
    } else {
        newsletter = false;
    }

    const userData = {
        id,
        name,
        occupation,
        newsletter
    }

    await User.update(userData, { where: {id: id} });

    res.redirect('/');
});

app.post('/address/create', async (req, res) => {
    const {UserId, street, number, city} = req.body;

    const address = {
        UserId,
        street,
        number,
        city
    }

    await Address.create(address);

    res.redirect(`/users/edit/${UserId}`);
});

conn
    .sync()
    //.sync({ force: true })
    .then(() => {
        app.listen(port, () => {
            console.log(`App rodando na porta ${port}`);
        });
    })
    .catch((err) => console.log(err));
