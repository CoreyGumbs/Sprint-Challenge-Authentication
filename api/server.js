require('dotenv').config();

const express = require('express');
const knex = require('knex');
const cors = require('cors');
const helmet = require('helmet'); 

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');

const server = express();


server.use(helmet());
server.use(cors());
server.use(express.json());


server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, jokesRouter);

module.exports = server;
