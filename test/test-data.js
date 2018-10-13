const dates = [
  {
    id: 1,
    day: 'July 17',
    astology_sign: 'Cancer'
  },
  {
    id: 2,
    day: 'July 16',
    astology_sign: 'Cancer'
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
    deletable: true
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
    date_id: 1
  },
  {
    name: 'Tim Fischer',
    death_id: 2,
    notes: 'He was the greatest poet that ever lived',
    date_id: 1
  },
  {
    name: 'Kurt Kurtains',
    death_id: 3,
    notes: 'She made the greatest curtains that ever lived',
    date_id: 2
  }
];

module.exports = [users, deaths, dates];
