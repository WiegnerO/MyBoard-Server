const knex = require('knex')
const config = require('../knexfile')
const db = knex(config.development);

module.exports = {
    createMessage,
    findAllMessages,
    findMessagesByBoardId,
    removeMessage,
    findReplies
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

/**
 * This query finds a specific messages based on thier board_id value
 * @param {*} id 
 */
function findMessagesByBoardId(board_id){
    return db('messages')
        .where({board_id})
        .where('parent_message' , null)
}

/**
 * This query will delete the message tuple with the same id value
 */
function removeMessage(id){
    return db('messages')
    .where({ id })
    .del();
}

function findReplies(parent_message){
    return db('messages')
        .where({parent_message})
}
