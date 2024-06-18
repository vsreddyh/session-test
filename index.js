const express = require('express');
const app = express();
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();
console.log(process.env.MONGODB_URI+ process.env.SESSION_SECRET)
const store = new MongoDBStore({
    uri: process.env.MONGODB_URI, // Use environment variable
    collection: 'mySessions',
});

store.on('connected', () => {
    console.log('MongoDB Session Store is connected.');
});

store.on('error', (error) => {
    console.error('Session store error:', error);
});

app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? 'https://session-test-lac.vercel.app' : 'http://localhost:3000',
    credentials: true
}));
app.set("trust proxy", 1);
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        proxy: true
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
        } else {
            console.log('Session saved:', req.session);
            res.json('stored');
        }
    });
});

app.get('/get', (req, res) => {
    if (req.session) {
        console.log('Session found:', req.session);
        res.json({
            data: req.session.store,
            id: req.sessionID,
            id1: req.session.id,
            cookie: req.session.cookie
        });
    } else {
        console.log('No session found');
        res.json({ message: 'No session found' });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Running on port ${port}`));
