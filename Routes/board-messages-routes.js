const express = require('express');
const router = express.Router();
const CONSOLEOUTPUT = require('../Services/consoleOutput')
const MESSAGEDB = require('../Services/messageService');
router.use(express.json());

/**
 * This allows users get all the messages of a specific topics
 */
router.get('', (req, res) =>{
    console.log(CONSOLEOUTPUT.requestConsole(req));
    MESSAGEDB.findAllMessages()
    .then(messages =>{
        res.status(200).json(messages)
    })
    .catch(err => {
        res.res.status(500).json({message : err})
    })
});
/**
 * allows users to post a new message
 */
router.post('', (req, res) => {
    const MessageInfo = req.body
    console.log(MessageInfo)
    console.log(CONSOLEOUTPUT.requestConsole(req));
    MESSAGEDB.createMessage(MessageInfo)
    .then(message => {
        res.status(200).json(message)
    })
    .catch( error => {
        res.status(500).json({ message: error})
    })
});

/**
 * This allows users get all the messages of a specific topics
 */
router.get('/:Bid', (req, res) => {
    const boardId = req.params.Bid;
    console.log(CONSOLEOUTPUT.requestConsole(req));
    MESSAGEDB.findMessagesByBoardId(boardId)
    .then(message => {
        res.status(200).json(message)
    })
    .catch( error => {
        res.status(500).json({ message: error})
    })
});


/**
 * This allows users delete a specific board message from the server
 */

router.delete('/:Mid', (req, res) => {
    const messageId = req.params.Mid;
    console.log(CONSOLEOUTPUT.requestConsole(req));
    MESSAGEDB.removeMessage(messageId)
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
