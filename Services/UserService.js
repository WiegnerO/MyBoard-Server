const knex = require('knex')
const config = require('../knexfile')
const db = knex(config.development);

module.exports = {
    addUser,
    findAllUsers,
    findUserByUsername,
    findUserById,
    removeUser
};

/**
 * This query adds a new user to the users table
 * It will return the users_id if successful
 * @param {*} user 
 */
async function addUser(user){
    const [id] = await db('users').insert(user);
    return id;
}

/**
 * This query returns all the users in the database
 */
function findAllUsers(){
    return db('users');
}

/**
 * This query finds a specific user based on thier user_id value
 * @param {*} id 
 */
function findUserById(id){
    return db('users')
        .where({ id });
}

/**
 * This query finds a specific user based on thier username value
 * @param {*} id 
 */
function findUserByUsername(user){
    return db('users')
        .where({ username : user }).first();
}

/**
 * This query will delete the user tuple with the same id value
 */
function removeUser(id){
    return db('users')
    .where({ id })
    .del();
}