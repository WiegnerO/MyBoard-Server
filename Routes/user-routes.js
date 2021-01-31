const express = require('express');
const router = express.Router();
const CONSOLEOUTPUT = require('../Services/consoleOutput');
const BOARDDB = require('../Services/boardService');
const USERDB = require('../Services/UserService');
router.use(express.json());


/**
 * This allows users their created MyBoard topics from the server
 */
router.get('/:creator_id', (req, res) => {
    console.log(CONSOLEOUTPUT.requestConsole(req));
    const creator_id = req.params.creator_id;
    BOARDDB.findBoardsMadeBy(creator_id)
    .then(board =>{
        res.status(200).json(board)
    })
    .catch(err => {
        res.res.status(500).json(err)
    })
});

/**
 * This allows users their created MyBoard topics from the server
 */
router.post('', (req, res) => {
    const userID = req.body.id
    console.log("hi")
    console.log(userID)
    console.log(CONSOLEOUTPUT.requestConsole(req));
    USERDB.findUserById(userID)
        .then(message => {
            res.status(200).json(message)
        })
        .catch( error => {
            res.status(500).json({ message: error})
        })
});

router.patch('/:id', (req, res) => {
    const id = req.params.id;
    const about_user = req.body.about_user;
    console.log(CONSOLEOUTPUT.requestConsole(req));
    USERDB.update(id, about_user)
    .then(message => {
        res.status(200).json(message)
    })
    .catch( error => {
        res.status(500).json({ message: error})
    })
});

module.exports = router

