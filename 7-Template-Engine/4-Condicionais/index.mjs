import express from 'express';
import { engine } from 'express-handlebars';

const app = express();
const port = 3000;

// Configuração do Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

app.get('/dashboard', (req, res) => {
    res.render('dashboard');
});

app.get('/', (req, res) => {
    const user = {
        name: "L",
        surname: "L",
    }

    const palavra = 'Teste';

    const auth = true;

    res.render('home', { user: user, palavra, auth });
});

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`);
});
