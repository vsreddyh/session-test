const express = require('express');
const app = express();
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');
const MongoDBStore = require('connect-mongodb-session')(session);
app.use(cors({
    origin: 'https://session-test-lac.vercel.app/',
    credentials: true
}));
var store = new MongoDBStore({
    uri: "mongodb+srv://Project:Florencemidhebaramvesam@project.tbx2krn.mongodb.net/sessy?retryWrites=true&w=majority",
    collection: 'mySessions',
});

app.use(
    session({
        secret: "9a3jKL$#3jfk4kljg%2f7sJ@*Lmn2J7H",
        resave: true,
        store: store,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            sameSite: true,
            secure: true,
            maxAge: 6 * 60 * 60 * 1000, //6 hours
            rolling: true, //whenever session is modified it resets expirytime
        },
    })
);
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.json('hello world');
});
app.get('/store', (req, res) => {
    req.session.store = 'hi0';
    req.session.save(err => {
        if(err) {
            console.log(err);
        }
        console.log(req.session.store,"hlo");
        res.json('stored');
    });
});
app.get('/get', (req, res) => {
    console.log(req.session.store);
    res.json({data:req.session.store,id:req.sessionID,id1:req.session.id,cookie:req.session.cookie});
});

// app.listen(3000, () => console.log('running on port 3000'));
