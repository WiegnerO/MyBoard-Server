const { request } = require("express");
module.exports = {
    requestConsole
};

/**
 * Will output the console log message for all the requests
 * @param {*} req 
 */
function requestConsole(req){
    return 'Request\t: ' + req.method.toString() +'\nRoute\t: ' + req.originalUrl.toString()
}