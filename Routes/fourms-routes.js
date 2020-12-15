const express = require('express');
const shortid = require('shortid');
const router = express.Router();

router.use(express.json());

//fake db data for now
const fourms = [
    {
        "name": "movies",
        "id": "cfCl9ExAK"
    },
    {
        "name": "music",
        "id": "KOwjASo-8"
    },
    {
        "name": "sports",
        "id": "eKlzO9GnB"
    }
];

/**
 * This allows users to post a new fourm topic to the server
 */
router.post('', (req, res) => {
    console.log('POST requset from api/fourms has been made :\n\t' + JSON.stringify(fourmInfo));
    const fourmInfo = req.body
    fourmInfo.id = shortid.generate();
    fourms.push(fourmInfo);
    res.status(201).json(fourmInfo);
});

/**
 * This allows users get all the fourm topics from the server
 */
router.get('', (req, res) => {
    console.log('GET requset from api/fourms has been made');
    res.json(fourms);
});

/**
 * This allows users get a specific fourm topic from the server
 */
router.get('/:id', (req, res) => {
    const topic = req.params.id; 
    for(i=0 ; i < fourms.length ; i++){
       if(fourms[i].name == topic){
        console.log(`get requset from api/fourms/${topic} has been made`);
        res.status(201).json(fourms[i]);
        return;
       }
    }
    console.log(`get requset from api/fourms/${topic} has NOT been made`);
    res.status(500).json({messages : `get requset from api/fourms/${topic} has NOT been made`});
});

/**
 * This allows users delete a specific fourm topic from the server
 */
router.delete('/:id', (req, res) => {
    const topic = req.params.id; 
    for(i=0 ; i < fourms.length ; i++){
       if(fourms[i].name == topic){
        console.log(`delete requset from api/fourms/${topic} has been made`);
        res.status(201).json(fourms[i]);
        fourms.splice(i , 1);
        return;
       }
    }
    console.log(`delete requset from api/fourms/${topic} has NOT been made`);
    res.status(500).json({messages : `delete requset from api/fourms/${topic} has NOT been made`});
});


module.exports = router