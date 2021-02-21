// $ knex migrate:make rates_table
// $ knex migrate:make create_tasks_table

exports.up = function(knex) {
    return knex.schema.createTable('rates' , table => {
        table.integer('creator_id')
            .unsigned()
            .notNullable();
        table.foreign('creator_id')
            .references('id')
            .inTable('users')
            .onDelete('CASCADE');

        table.integer('message_id')
            .unsigned()
            .notNullable();
        table.foreign('message_id')
            .references('id')
            .inTable('messages')
            .onDelete('CASCADE');
        table.primary(['creator_id', 'message_id']);
    })
};

exports.down = function(knex) {
  
};
