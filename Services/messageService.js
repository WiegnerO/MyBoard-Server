const knex = require('knex')
const config = require('../knexfile')
const db = knex(config.development);

module.exports = {
    createMessage,
    findAllMessages
};

async function createMessage(message){
    const [id] = await db('messages').insert(message);
    return id;
}

/**
 * This query returns all the messages in the database
 */
function findAllMessages(){
    return db('messages');
}