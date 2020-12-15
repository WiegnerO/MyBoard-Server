const express = require('express');
const shortid = require('shortid');
const router = express.Router();

router.use(express.json());

//fake db data for now
const messages = [
    {
        "title": "IMO best movie",
        "content": "The Shawshank Redemption",
        "id": "1"
    },
    {
        "title": "^^100% true",
        "content": "I agree with your post",
        "id": "2"
    },
    {
        "title": "Defs not true",
        "content": "No way the best movie is Super Mario Bros the movie",
        "id": "3"
    }
];

/**
 * This allows users get all the messages of a specific topics
 */
router.get('', (req, res) => {
    console.log('get requset from api/message has been made');
    res.json(messages);
});

router.post('', (req, res) => {
    const message = req.body
    message.id = shortid.generate();
    messages.push(message);
    res.status(201).json(message);
    console.log('post requset from api/fourms has been made :\n\t' + JSON.stringify(message));
});


/**
 * This allows users delete a specific fourm message from the server
 */
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    console.log("YYZ " + id);
    for(i=0 ; i < messages.length ; i++){
       if(messages[i].id == id){
        res.status(201).json(messages[i]);
        messages.splice(i , 1);
        return;
       }
    }
    res.status(500).json({messages : `delete requset from has NOT been made`});
});

module.exports = router