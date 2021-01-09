const express = require('express');
const restricted = require('../Authentication/restricted-middleware')
const server = express();

/**
 * Help with CORS issues
 */
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, x-requested-with, content-type, accept, authorization");
    next();
  });

//Sets up the routes
const fourmsRouter = require('../Routes/fourms-routes');
const fourmMessageRouter = require('../Routes/fourm-messages-routes');
const authRouter = require('../Authentication/auth-routes');

server.use(express.json());

//TODO uadd the middleware
server.use('/api/auth', authRouter);
server.use('/api/fourms', fourmsRouter);
server.use('/api/messages', fourmMessageRouter);


server.get('', (req, res) => {
    res.json({ message: "*** This is the front page of the MyBoard server ***"});
})

module.exports = server;