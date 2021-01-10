const express = require('express');
const shortid = require('shortid');
const router = express.Router();

router.use(express.json());

//fake db data for now
var messages = [
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
    console.log(`Request\t: GET \nRoute\t: api/fourms/${boardId}`);
    var filter_function = function(e){
        return e.Bid == boardId
    }
    const boardMessages = messages.filter(filter_function)
    res.json(boardMessages);
});

router.post('/:Bid', (req, res) => {
    const boardId = req.params.Bid;
    const message = req.body
    console.log(`Request\t: POST \nRoute\t: api/fourms/${boardId}`);
    message.Mid = shortid.generate();
    messages.push(message);
    res.status(201).json({message : message});
});


/**
 * This allows users delete a specific fourm message from the server
 */
router.delete('/:Bid/:Mid', (req, res) => {
    const boardId = req.params.Bid;
    const messageId = req.params.Mid;
    console.log(`Request\t: DELETE \nRoute\t: api/fourms/${boardId}/${messageId}`);
    var filter_function = function(e){
        return e.Mid != messageId
    }
    messages = messages.filter(filter_function)
    res.json(messages);
});

module.exports = router