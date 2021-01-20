
exports.up = function(knex) {
  return knex.schema.createTable('users' , table => {
    table.increments();
    table.string('username')
        .notNullable()
        .unique();
    table.string('password')
        .notNullable();
    table.string('first_name')
        .notNullable();
    table.string('last_name')
        .notNullable();
    table.string('about_user' , 128);
  })
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
