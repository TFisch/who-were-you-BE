exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('dates', table => {
      table.increments('id').primary();
      table.string('day');
      table.string('astrology_sign');

      table.timestamps(true, true);
    }),
    knex.schema.createTable('deaths', table => {
      table.increments('id').primary();
      table.string('person_name');
      table.integer('date_id').unsigned();
      table.foreign('date_id').references('dates.id');
      table.integer('year');

      table.timestamps(true, true);
    }),
    knex.schema.createTable('users', table => {
      table.increments('id').primary();
      table.string('name');
      table.integer('death_id').unsigned();
      table.foreign('death_id').references('deaths.id');
      table.string('notes');

      table.timestamps(true, true);
    })
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('deaths'),
    knex.schema.dropTable('dates')
  ]);
};
