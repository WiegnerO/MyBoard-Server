const express = require('express');

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
const fourmMessageRouter = require('../Routes/fourm-messages-routes')

const fourms = [];

server.use(express.json());
server.use('/api/fourms', fourmsRouter);
server.use('/api/messages', fourmMessageRouter);


server.get('', (req, res) => {
    res.json({ message: "*** This is the front page of the MyBoard server ***"})
})

module.exports = server;