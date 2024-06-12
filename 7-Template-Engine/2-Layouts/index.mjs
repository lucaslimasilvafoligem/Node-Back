import express from 'express';
import { engine } from 'express-handlebars';

const app = express();
const port = 3000;

// Configuração do Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`);
});
