
exports.up = function(knex) {
    return knex.schema.createTable('myBoards' , table => {
    table.increments();
    table.string('board_name')
        .notNullable()
        .unique();
    table.integer('creator_id')
        .unsigned()
        .notNullable();
    table.foreign('creator_id')
        .references('id')
        .inTable('users')
        .onDelete('CASCADE');
    })
  };
  
  exports.down = function(knex) {
      return knex.schema.dropTable('myBoards');
  };