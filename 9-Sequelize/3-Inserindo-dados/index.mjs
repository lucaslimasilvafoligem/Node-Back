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

app.use('/users/create', (req, res) => {
    res.render('adduser');
});

app.get('/', (req, res) => {
    res.render('home');
});

app.post('/users/create', async (req, res) => {
    const {name, occupation} = req.body;
    let newsletter = req.body.newsletter

    if (newsletter === 'on') {
        newsletter = true;
    } else {
        newsletter = false;
    }

    await User.create(name, occupation, newsletter);

    res.redirect('/');
});

conn
    .sync()
    .then(() => {
        app.listen(port);
        console.log(`App rodando na porta ${port}`);
    }).catch((err) => console.log(err));