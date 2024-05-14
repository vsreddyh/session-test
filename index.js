const express = require('express');
const app = express();
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');
const MongoDBStore = require('connect-mongodb-session')(session);
app.use(
    cors({
        
    })
);
var store = new MongoDBStore({
    uri: "mongodb+srv://Project:Florencemidhebaramvesam@project.tbx2krn.mongodb.net/sessy?retryWrites=true&w=majority",
    collection: 'mySessions',
});

app.use(
    session({
        secret: "9a3jKL$#3jfk4kljg%2f7sJ@*Lmn2J7H",
        resave: false,
        store: store,
        saveUninitialized: true,
        cookie: {
            httpOnly: true,
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
    console.log(req.session.store,"hlo");
    res.json('stored');
});
app.get('/get', (req, res) => {
    console.log(req.session.store);
    res.json({data:req.session.store});
});

app.listen(3000, () => console.log('running on port 3000'));
