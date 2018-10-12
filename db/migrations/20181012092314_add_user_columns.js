exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('deaths', table => {
      table.string('deletable');
    }),
    knex.schema.table('users', table => {
      table.string('day_id');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('deaths', table => {
      table.dropColumn('deletable');
    }),
    knex.schema.table('users', table => {
      table.dropColumn('day_id');
    })
  ]);
};
