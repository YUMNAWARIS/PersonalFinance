const path = require('path');
const auth_router = require('./routers/auth');
const account_router = require('./routers/account');
const parser = require('body-parser');
const session = require('express-session');
const express = require('express');
const mongodbStore = require('connect-mongodb-session')(session);
const mongoose = require('mongoose');

const app = express();
const db = "mongodb://127.0.0.1:27017/expense_fin_tech";
const store = new mongodbStore({
    uri: db,
    collection: "session",
})

app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));
let encodeUrl = parser.urlencoded({ extended: false });
app.use(encodeUrl);
app.use(session({ secret: "P@$$w0rd$", resave: false, saveUninitialized: false, store: store }));


app.get('/', (req, res) => {
    res.render("Entry/entry")
});

app.use('/auth', auth_router);

app.use(function (req, res, next) {
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    next();
});

app.use('/account', account_router);

app.use('/', (req, res) => {
    res.render('error');
});

mongoose.connect(db)
    .then(() => {
        console.log("Database is connected successfully.");
        app.listen(4000, () => {
            console.log("Server is listening on port 4000");
        });
    })
    .catch(err => {
        console.log(err);
    })