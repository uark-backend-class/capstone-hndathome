require('dotenv').config()
const express = require('express');
const hbs = require('express-handlebars');
const routes = require('./routes');
const session = require('express-session');
const passport = require('passport');
const configPassport = require('./passport.config');
require('./db');

configPassport(passport);
const errorHandler = require('errorhandler');

const app = express();
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));
app.engine('hbs', hbs({
    extname: 'hbs',
    helpers: {
        getPrettyNumber(number) {
            if (number === null) {
                return "no data is available"
            }
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        getUpDown(number) {
            let str = "";
            if (number) {
                if (number > 0) {
                    str = `<i class="fa fw fa-caret-up increase"></i>`
                }
                else {
                    str = `<i class="fa fw fa-caret-down decrease"></i>`
                }
            }
            return str;
        },
        getPlusMinus(number) {
            let str = "";
            if (number) {
                if (number > 0) {
                    str = `<i class="fa fw fa-plus decrease"></i>`
                }
                else {
                    str = `<i class="fa fw fa-minus increase"></i>`
                }
            }
            return str;
        }
    }
}));
app.set('view engine', 'hbs');
app.use(express.static('public'));
app.use(routes);
app.use(errorHandler({ log: errorNotification }));

function errorNotification(err, str, req) {
    console.log('ERROR', err);
}

app.listen(3000, () => {
    console.log(`Where Covid-19 Matters running on port 3000`);
});



