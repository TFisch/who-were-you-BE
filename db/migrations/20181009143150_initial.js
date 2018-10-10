exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('dates', (table) => {
      table.increments('id').primary();
      table.string('day');
      table.string('astrology_sign');

      table.timestamps(true, true);
    }),
    knex.schema.createTable('deaths', (table) => {
      table.increments('id').primary();
      table.string('person_name');
      table.integer('day_id').unsigned();
      table.foreign('day_id').references('dates.id');

      table.timestamps(true, true);
    }),
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([knex.schema.dropTable('deaths'), knex.schema.dropTable('dates')]);
};
