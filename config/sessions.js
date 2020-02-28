const session = require('express-session');
const knexStore = require('connect-session-knex')(session); 


const sessionConfig = {
    name: 'user',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUnintialized: true,
    cookie: {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        secure: false,
        httpOnly: true
    },
    store: new knexStore({
       knex,
       tablename: 'sessions',
       createtable: true,
       sidfieldname: 'sid',
       clearInterval:  1000 * 60 * 30,
    })
};

module.exports = sessionConfig;