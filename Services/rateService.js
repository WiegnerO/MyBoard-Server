const knex = require('knex')
const config = require('../knexfile')
const db = knex(config.development);

module.exports = {
    isRatedByUser,
    getAllRates,
    messageRating,
    addRate,
    deleteRate
};

function isRatedByUser(message_id, creator_id){
    return db('rates').where({ message_id }).where({ creator_id })
}

function messageRating(message_id){
    return db('rates').where({ message_id }).count('* as count')
}

function getAllRates(message_id, creator_id){
    return db('rates')
}

async function addRate(rate){
    await db('rates').insert(rate);
}

async function deleteRate(mid, uid){
    message_id = mid;
    creator_id = uid;
    await db('rates')
        .where({ message_id })
        .where({ creator_id })
        .del()
}
