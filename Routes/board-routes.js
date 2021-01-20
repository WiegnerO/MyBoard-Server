const express = require('express');
const shortid = require('shortid');
const router = express.Router();
const CONSOLEOUTPUT = require('../Services/consoleOutput');
const BOARDDB = require('../Services/boardService');
router.use(express.json());

/**
 * This allows users to post a new board topic to the server
 */
router.post('', (req, res) => {
    const BoardInfo = req.body
    console.log(CONSOLEOUTPUT.requestConsole(req));
    BOARDDB.createBoard(BoardInfo)
    .then(board => {
        res.status(200).json(board)
    })
    .catch( error => {
        res.status(500).json({ message: error})
    })
});

/**
 * This allows users get all the board topics from the server
 */
router.get('', (req, res) =>{
    console.log(CONSOLEOUTPUT.requestConsole(req));
    BOARDDB.findAllBoards()
    .then(boards =>{
        res.status(200).json(boards)
    })
    .catch(err => {
        res.res.status(500).json({message : err})
    })
});

/**
 * This allows users get a specific board topic from the server
 */
router.get('/:name', (req, res) => {
    console.log(CONSOLEOUTPUT.requestConsole(req));
    const name = req.params.name; 
    BOARDDB.findBoardByname(name)
    .then(board =>{
        res.status(200).json(board)
    })
    .catch(err => {
        res.res.status(500).json(err)
    })
});

/**
 * This allows users delete a specific board topic from the server
 */
router.delete('/:board_id', (req, res) => {
    const board_id = req.params.board_id;
    console.log(CONSOLEOUTPUT.requestConsole(req));
    BOARDDB.removeBoard(board_id)
    .then(count =>{
        if(count > 0){
            res.status(200).json({ message: "Deleted"})
        }
        else{
            res.status(404).json({ message: "Board does not exist"})
        }
    })
    .catch( error => {
        res.status(500).json({ message: error})
    })
});


module.exports = router