import express from 'express';
import { engine } from 'express-handlebars';

const app = express();
const port = 3000;

// Configuração do Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {

    const user = {
        name: "L",
        surname: "L"
    }

    res.render('home', { user: user });
});

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`);
});
