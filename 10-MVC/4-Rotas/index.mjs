import express from 'express';
import { engine } from 'express-handlebars';
import coon from './db/coon.mjs';
import Task from './models/Task.mjs';
import tasksRoutes from './routes/tasksRoutes.mjs';

const app = express();
const port = 3000;

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/tasks', tasksRoutes);

coon.sync()
    .then(() => {
        app.listen(port, () => {
            console.log(`App rodando na porta ${port}`);
        });
    })
    .catch((err) => console.log(err));
