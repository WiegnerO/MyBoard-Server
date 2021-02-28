// $ knex migrate:make rates_table
// $ knex migrate:make create_tasks_table

exports.up = function(knex) {
    return knex.schema.createTable('rates' , table => {
        table.integer('rater_id')
            .unsigned()
            .notNullable();
        table.foreign('rater_id')
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
        table.primary(['rater_id', 'message_id']);
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('rates');
};
