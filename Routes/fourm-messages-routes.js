const express = require('express');
const shortid = require('shortid');
const router = express.Router();

router.use(express.json());

//fake db data for now
const messages = [
    {
        "title": "IMO best movie",
        "content": "The Shawshank Redemption",
        "Mid": "1",
        "Uid": "1",
        "Bid": "sports"
    },
    {
        "title": "^^100% true",
        "content": "I agree with your post",
        "Mid": "2",
        "Uid": "2",
        "Bid": "music"
    },
    {
        "title": "Defs not true",
        "content": "No way the best movie is Super Mario Bros the movie",
        "Mid": "3",
        "Uid": "3",
        "Bid": "movies"
    }
];

/**
 * This allows users get all the messages of a specific topics
 */
router.get('/:Bid', (req, res) => {
    const boardId = req.params.Bid;
    console.log('get requset from api/message has been made');
    var filter_function = function(e){
        return e.Bid == boardId
    }
    const x = messages.filter(filter_function)
    console.log(x)
    res.json(x);
});

router.post('/', (req, res) => {
    const message = req.body
    message.Mid = shortid.generate();
    messages.push(message);
    res.status(201).json({message : message});
    console.log('post requset from api/fourms has been made :\n\t' + JSON.stringify(message));
});


/**
 * This allows users delete a specific fourm message from the server
 */
router.delete(':Bid/:Mid', (req, res) => {
    const boardId = req.params.Bid;
    const messageId = req.params.Mid;
    return messages.filter(message => {
        message.Mid = messageId;
    })
});

module.exports = router