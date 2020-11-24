
exports.up = function(knex) {
    return knex.schema.createTable('users',tbl => {
        tbl.increments();
        tbl.string('salt', 128).notNullable();
        tbl.string('saltedHash', 128).notNullable();
        tbl.string('username', 64).unique().notNullable();
        tbl.string('email', 128).notNullable();
  })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
};