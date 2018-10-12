const deaths = require('../../../allData');
let deathData = deaths;
let datesData = [];

deathData.forEach(death => {
  if (!datesData.find(date => date.day === death.deathDay)) {
    datesData.push({ day: death.deathDay, astrology_sign: death.astroSign });
  }
});

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

const createDate = (knex, date) => {
  return knex('dates')
    .insert(
      {
        day: date.day,
        astrology_sign: date.astrology_sign
      },
      'id'
    )
    .then(dateId => {
      let deathPromises = [];

      deathData.forEach(death => {
        deathPromises.push(
          createDeath(knex, {
            person_name: death.deadPerson,
            day_id: dateId[0],
            year: death.deathYear
          })
        );
      });
      return Promise.all(deathPromises);
    });
};

const createDeath = (knex, death) => {
  return knex('deaths').insert(death);
};

exports.seed = (knex, Promise) => {
  return knex('users')
    .del()
    .then(() => knex('deaths').del())
    .then(() => knex('dates').del())
    .then(() => {
      let datePromises = [];

      datesData.forEach(date => {
        datePromises.push(createDate(knex, date));
      });
      return Promise.all(datePromises);
    })
    .then(() => console.log('Seeding complete!'))
    .catch(error => console.log(`Error seeding data: ${error}`));
};
