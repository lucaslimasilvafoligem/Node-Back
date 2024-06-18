import express from 'express';
import { engine } from 'express-handlebars';
import coon from './db/index.mjs';

const app = express();
const port = 3000;

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.render('home');
});


app.listen(port, () => {
    console.log(`App rodando na porta ${port}`);
});
