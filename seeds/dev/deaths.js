const deaths = require('../../allData');
let deathsData = deaths;
let daysOfYear = [];

const userData = [
  {
    name: 'Cody Taft',
    death_id: 5201,
    notes: 'He played the Mayor of Munchkin City in The Wizard of Oz'
  },
  {
    name: 'Tim Fischer',
    death_id: 1362,
    notes:
      'He was a left-handed pitcher who won the World Series 5 times with the Yankees'
  }
];

const createDates = (knex, death) => {
  return knex('dates')
    .insert(
      {
        day: death.deathDay,
        astrology_sign: death.astroSign
      },
      'id'
    )
    .then(dateId => {
      let deathPromises = [];

      deathPromises.push(
        createDeath(knex, {
          person_name: death.deadPerson,
          day_id: dateId[0],
          year: death.deathYear
        })
      );
    });
  return Promise.all(deathPromises);
};

const createDeath = (knex, death) => {
  return knex('deaths').insert(death);
};

exports.seed = function(knex, Promise) {
  return knex('users')
    .del()
    .then(() => knex('deaths').del())
    .then(() => knex('dates').del())
    .then(() => {
      userData.forEach(user => {
        knex('users').insert(user);
      });
    })
    .then(() => {
      let datePromises = [];

      deathsData.forEach(death => {
        datePromises.push(createDates(knex, death));
      });

      return Promise.all(datePromises);
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
