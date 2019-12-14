const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');
const session = require('express-session');

const server = express();

const sessionConfig = {
    name: 'mycookie',
    secret: 'cookiesareyumyummewantcookies',
    cookie: {
        maxAge: 1000 * 60 * 60,
        secure: false,
        httpOnly: true
    },
    resave: false,
    saveUninitialized: true,
}
server.use(session(sessionConfig));

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api', authRouter);
server.use('/api/jokes', authenticate, jokesRouter);

server.get("/", (req, res) => {
    res.status(200).json({ api: "running" });
});

module.exports = server;