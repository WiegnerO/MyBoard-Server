const knex = require('knex')
const config = require('../knexfile')
const db = knex(config.development);

module.exports = {
    createBoard,
    findAllBoards,
    findBoardById,
    findBoardByname,
    removeBoard,
    findBoardsMadeBy
};

/**
 * This query adds a board to the table
 * It will return the myBoard_id if successful
 * @param {*} board 
 */
async function createBoard(board){
    const [id] = await db('myBoards').insert(board);
    return id;
}

/**
 * This query returns all the boards in the database
 */
function findAllBoards(){
    return db('myBoards');
}

/**
 * This query finds a specific board based on thier board_id value
 * @param {*} id 
 */
function findBoardById(id){
    return db('myBoards')
        .where({ id });
}

/**
 * This query finds all the boards created by a specific user 
 * @param {*} id 
 */
function findBoardsMadeBy(creator_id){
    return db('myBoards')
        .where({creator_id});
}

/**
 * This query finds a specific board based on thier board_name value
 * @param {*} id 
 */
function findBoardByname(board_name){
    return db('myBoards')
        .where({ board_name }).first()
        .select(
            'myBoards.id',
        )
}


/**
 * This query will delete the board tuple with the same id value
 */
function removeBoard(id){
    return db('myBoards')
    .where({ id })
    .del();
}
