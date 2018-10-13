const dates = [
  {
    id: 1,
    day: 'July 17',
    astrology_sign: 'Cancer'
  },
  {
    id: 2,
    day: 'July 16',
    astrology_sign: 'Cancer'
  }
];

const deaths = [
  {
    id: 1,
    person_name: 'Jimi Hendrix',
    date_id: 1,
    year: 1986,
    deletable: true
  },
  {
    id: 2,
    person_name: 'Jim Morrison',
    date_id: 1,
    year: 1986,
    deletable: false
  },
  {
    id: 3,
    person_name: 'Janis Joplin',
    date_id: 2,
    year: 1986,
    deletable: true
  }
];

const users = [
  {
    name: 'Cody Taft',
    death_id: 1,
    notes: 'He was the greatest guitar player that ever lived',
    date_id: 2
  },
  {
    name: 'Tim Fischer',
    death_id: 2,
    notes: 'He was the greatest poet that ever lived',
    date_id: 1
  },
  {
    name: 'Kurt Kurtains',
    death_id: null,
    notes: 'She made the greatest curtains that ever lived',
    date_id: 1
  }
];

exports.seed = (knex, Promise) => {
  return knex('users')
    .del()
    .then(() => knex('deaths').del())
    .then(() => knex('dates').del())
    .then(() => {
      return Promise.all([
        knex('dates')
          .insert(dates)
          .then(() => {
            return knex('deaths')
              .insert(deaths)
              .then(() => {
                return knex('users').insert(users);
              });
          })
      ]);
    })
    .then(() => console.log('Seeding complete!'))
    .catch(error => console.log(`Error seeding data: ${error}`));
};
