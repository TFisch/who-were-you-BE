exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('deaths', table => {
      table.boolean('deletable');
    }),
    knex.schema.table('users', table => {
      table.integer('date_id').unsigned();
      table.foreign('date_id').references('dates.id');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('deaths', table => {
      table.dropColumn('deletable');
    }),
    knex.schema.table('users', table => {
      table.dropColumn('date_id');
    })
  ]);
};
