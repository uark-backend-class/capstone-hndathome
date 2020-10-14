require('dotenv').config()
const express = require('express');
const hbs = require('express-handlebars');
const routes = require('./routes');
const session = require('express-session');
const passport = require('passport');
const configPassport = require('./passport.config');
require('./db');

configPassport(passport);

const app = express();
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));
app.engine('hbs', hbs({ extname: 'hbs' }));
app.set('view engine', 'hbs');

app.use(routes);

app.listen(3000, () => {
    console.log(`Where Covid-19 Matters running on port 3000`);
});



