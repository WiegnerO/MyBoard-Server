
exports.up = function(knex) {
    return knex.schema.createTable('messages' , table => {
    table.integer('board_id')
        .unsigned()
        .notNullable();
    table.foreign('board_id')
        .references('id')
        .inTable('myBoards')
        .onDelete('CASCADE');
    table.integer('creator_id')
        .unsigned()
        .notNullable();
    table.foreign('creator_id')
        .references('id')
        .inTable('users')
        .onDelete('CASCADE');
    table.string('post_title')
        .notNullable()
    table.string('post_content')
        .notNullable()
    })
  };
  
  exports.down = function(knex) {
      return knex.schema.dropTable('messages');
  };