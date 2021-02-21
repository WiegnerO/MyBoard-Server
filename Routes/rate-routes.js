const express = require('express');
const router = express.Router();
router.use(express.json());
const CONSOLEOUTPUT = require('../Services/consoleOutput');
const RATEDB = require('../Services/rateService');



router.get('/:mid/:uid', (req, res) => {
    console.log(CONSOLEOUTPUT.requestConsole(req));
    const mid = req.params.mid;
    const uid = req.params.uid;
    RATEDB.isRatedByUser(mid,uid)
        .then(rated =>{
            if (rated.length > 0) {
                res.status(200).json(true)
            } else {
                res.status(200).json(false)
            }
        })
        .catch(error => {
            res.status(200).json(error)
        })
});

router.get('/:mid', (req, res) => {
    console.log(CONSOLEOUTPUT.requestConsole(req));
    const mid = req.params.mid;
    RATEDB.messageRating(mid)
        .then(rated =>{
            res.status(200).json(rated)
        })
        .catch(error => {
            res.status(200).json(error)
        })
});

router.get('', (req, res) => {
    console.log(CONSOLEOUTPUT.requestConsole(req));
    RATEDB.getAllRates()
        .then(rated =>{
            res.status(200).json(rated)
        })
        .catch(error => {
            res.status(200).json(error)
        })
});

router.post('', (req, res) => {
    console.log(CONSOLEOUTPUT.requestConsole(req));
    const rate = req.body
    RATEDB.addRate(rate)
        .then(rated =>{
            res.status(200).json(rated)
        })
        .catch(error => {
            res.status(200).json(error)
        })
})

router.delete('/:mid/:uid', (req, res) => {
    console.log(CONSOLEOUTPUT.requestConsole(req));
    const mid = req.params.mid;
    const uid = req.params.uid;
    RATEDB.deleteRate(mid,uid)
        .then(rated =>{
            res.status(200).json(rated)
        })
        .catch(error => {
            res.status(200).json(error)
        })
})







module.exports = router
