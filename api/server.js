const express = require('express');
const restricted = require('../Authentication/restricted-middleware')
const server = express();
var cors = require('cors')

//CORS
server.use(cors())
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, x-requested-with, content-type, accept, authorization");
    next();
  });

//Sets up the routes
const boardsRouter = require('../Routes/board-routes');
const boardMessageRouter = require('../Routes/board-messages-routes');
const authRouter = require('../Authentication/auth-routes');
const userRouter = require('../Routes/user-routes');
const rateRouter = require('../Routes/rate-routes');

server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/user', userRouter);
server.use('/api/boards', restricted, boardsRouter);
server.use('/api/messages', restricted, boardMessageRouter);
server.use('/api/rate', restricted, rateRouter);


server.get('', (req, res) => {
    res.json({ message: "*** This is the front page of the MyBoard server ***"});
})

module.exports = server;
