import express from 'express';
import { engine } from "express-handlebars";
import session from 'express-session';
import fileStore from 'session-file-store';
import flash from 'express-flash';
import path from 'path';
import os from "os";
import conn from   './db/coon.mjs';
import User from "./models/User.mjs";
import Tought from './models/Tought.mjs';
import toughtsRoutes from "./routes/toughtsRoutes.mjs";
import ToughtsController from "./controllers/ToughtsController.mjs";
import authRoutes from "./routes/authRoutes.mjs";

const FileStore = fileStore(session);
const port = 3000;
const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
    session({
        name: 'session',
        secret: 'nosso_secret',
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
            logFn: function() {},
            path: path.join(os.tmpdir(), 'sessions'),
        }),
        cookie: {
            secure: false,
            maxAge: 36000,
            //expires: new Date(Date.now() + 36000),
            httpOnly: true
        },
    }),
);

app.use(flash());

app.use((req, res, next) => { 
    if (req.session.userid) {
        res.locals.session = req.session;
    }
    next();
});

app.use('/toughts', toughtsRoutes);
app.use('/', authRoutes);

app.get('/', ToughtsController.showToughts);

conn
    //.sync({force: true})
    .sync()
    .then(() => {
        app.listen(port);
        console.log(`App rodando na porta ${port}`);
    })
    .catch((err) => console.log(err)
);
