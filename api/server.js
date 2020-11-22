const express = require('express');

const server = express();

//Sets up the routes
const fourmsRouter = require('../Routes/fourms-routes');

const fourms = [];

server.use(express.json());
server.use('/api/fourms', fourmsRouter);

server.get('', (req, res) => {
    res.json({ message: "*** This is the front page of the MyBoard server ***"})
})

module.exports = server;