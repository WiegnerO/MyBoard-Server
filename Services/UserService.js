const knex = require('knex')
const config = require('../knexfile')
const db = knex(config.development);

module.exports = {
    addUser,
    findAllUsers,
    findUserByUsername,
    findUserById,
    removeUser,
    update,
    updateProfilePicture,
    getImage
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
        .where({ id })
        .select(
            'users.id',
            'users.username',
            'users.first_name',
            'users.last_name',
            'users.about_user',
        );
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

async function update(id, about_user){
    return db('users')
    .where({ id })
    .update({about_user: about_user})
        .then(() => {
            return findUserById(id)
        })
}

async function updateProfilePicture(id, req){
    const {data} = req.files.profile_picture;
    return db('users')
        .where({ id })
        .update({profile_picture: data})
}

async function getImage(id) {
    return  db('users')
        .where({id})
        .first();
}
