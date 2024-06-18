const express = require('express');
const app = express();
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const cors = require('cors');
const bodyParser = require('body-parser');

const store = new MongoDBStore({
    uri: 'mongodb+srv://Project:Florencemidhebaramvesam@project.tbx2krn.mongodb.net/sessy?retryWrites=true&w=majority',
    collection: 'mySessions',
});

app.use(cors({
    origin: 'https://session-test-lac.vercel.app',
    credentials: true
}));

app.use(session({
    secret: "9a3jKL$#3jfk4kljg%2f7sJ@*Lmn2J7H",
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        httpOnly: true,
        sameSite: 'strict',
        secure: false // must be true to send cookies over https
    }
}));

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json('hello world');
});

app.get('/store', (req, res) => {
    req.session.store = 'hi0';
    req.session.save(err => {
        if (err) {
            console.log(err);
        }
        console.log(req.session.store, "hlo");
        res.json('stored');
    });
});

app.get('/get', (req, res) => {
    console.log(req.session.store);
    res.json({
        data: req.session.store,
        id: req.sessionID,
        id1: req.session.id,
        cookie: req.session.cookie
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Running on port ${port}`));

