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
    death_id: 1,
    notes: 'He played the Mayor of Munchkin City in The Wizard of Oz'
  },
  {
    name: 'Tim Fischer',
    death_id: 2,
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
      ['id', 'day']
    )
    .then(day => {
      let deathPromises = [];

      deathData.forEach(death => {
        if (death.deathDay === day[0].day) {
          deathPromises.push(
            createDeath(knex, {
              person_name: death.deadPerson,
              date_id: day[0].id,
              year: death.deathYear,
              deletable: false
            })
          );
        }
      });
      return Promise.all(deathPromises);
    });
};

const createDeath = (knex, death) => {
  return knex('deaths').insert(death, 'id');
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
