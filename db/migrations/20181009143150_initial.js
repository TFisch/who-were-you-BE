
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('deaths', function (table) {
      table.increments('id').primary()
      table.string('name')
      table.string('year');
    }),
    knex.schema.createTable('dates', function (table) {
      table.increments('id').primary();
      table.integer('death_id').unsigned()
      table.foreign('death_id')
        .references('deaths.id')
    })
  ])
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('deaths'),
    knex.schema.dropTable('dates')
  ]);

};
