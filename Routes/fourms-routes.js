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
    const fourmInfo = req.body
    console.log('Request\t: POST \nRoute\t: api/fourms');
    fourmInfo.id = shortid.generate();
    fourms.push(fourmInfo);
    res.status(201).json(fourmInfo);
});

/**
 * This allows users get all the fourm topics from the server
 */
router.get('', (req, res) => {
    console.log('Request\t: GET \nRoute\t: api/fourms');
    res.json(fourms);
});

/**
 * This allows users get a specific fourm topic from the server
 */
router.get('/:id', (req, res) => {
    const topic = req.params.id; 
    for(i=0 ; i < fourms.length ; i++){
       if(fourms[i].name == topic){
        console.log(`Request\t: GET \nRoute\t: api/fourms/${topic}`);
        res.status(201).json(fourms[i]);
        return;
       }
    }
    res.status(500).json({messages : `get request from api/fourms/${topic} has NOT been made`});
});

/**
 * This allows users delete a specific fourm topic from the server
 */
router.delete('/:id', (req, res) => {
    const topic = req.params.id; 
    console.log(`Request\t: Delete \nRoute\t: api/fourms/${topic} has been made`);
    for(i=0 ; i < fourms.length ; i++){
       if(fourms[i].name == topic){
        res.status(201).json(fourms[i]);
        fourms.splice(i , 1);
        return;
       }
    }
    console.log(`delete request from api/fourms/${topic} has NOT been made`);
    res.status(500).json({messages : `delete request from api/fourms/${topic} has NOT been made`});
});


module.exports = router