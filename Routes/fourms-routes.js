const express = require('express');
const shortid = require('shortid');
const router = express.Router();

router.use(express.json());

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
    fourmInfo.id = shortid.generate();
    fourms.push(fourmInfo);
    res.status(201).json(fourmInfo);
});

/**
 * This allows users get all the fourm topics to the server
 */
router.get('', (req, res) => {
    res.json(fourms);
});

router.get('/:id', (req, res) => {
    const topic = req.params.id; 
    for(i=0 ; i < fourms.length ; i++){
       if(fourms[i] == topic){
        res.status(201).json('hi');
       }
    }
    res.status(500).json(fourms[0]);
});

module.exports = router