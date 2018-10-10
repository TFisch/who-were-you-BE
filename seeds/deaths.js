const deaths = require('../allData');
let deathsData = deaths;

console.log(deathsData);

const createDeath = (knex, death) => {
  return knex('deaths').insert({
    person_name: death.deadPerson,
    year: deathyear
  });
};

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('table_name')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('table_name').insert([
        { id: 1, colName: 'rowValue1' },
        { id: 2, colName: 'rowValue2' },
        { id: 3, colName: 'rowValue3' }
      ]);
    });
};
