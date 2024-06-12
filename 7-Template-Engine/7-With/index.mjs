import express from 'express';
import { engine } from 'express-handlebars';

const app = express();
const port = 3000;

// Configuração do Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

app.get('/dashboard', (req, res) => {

    const items = ["a", "b", "c"];

    res.render('dashboard', { items });
});

app.get('/post', (req, res) => {
    const post = {
        title: 'Node js',
        category: 'JavaScript',
        body: 'Este artigo vai te ajudar a aprender Node.js',
        comments: 4,
    };

    res.render('blogpost', { post  });
});

app.get('/', (req, res) => {
    const user = {
        name: "L",
        surname: "L",
    }

    const palavra = 'Teste';

    const auth = true;

    const approved = true;

    res.render('home', { user: user, palavra, auth, approved });
});

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`);
});
