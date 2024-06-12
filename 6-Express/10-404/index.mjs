import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import users from './users/index.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Servir arquivos estáticos da pasta 'public'
app.use(express.static('/public'));

app.use('/users', users);

const basePath = path.join(__dirname, 'templates');

app.get('/', (req, res) => {
    res.sendFile(path.join(basePath, 'index.html'));
});

app.use(function(req, res, next){
    res.status(404).sendFile(path.join(`${basePath}/404.html`));
});

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`);
});
