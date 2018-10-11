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
    day_id: 1,
    year: 1986
  },
  {
    id: 2,
    person_name: 'Jim Morrison',
    day_id: 1,
    year: 1986
  },
  {
    id: 3,
    person_name: 'Janis Joplin',
    day_id: 2,
    year: 1986
  }
];

const users = [
  {
    name: 'Cody Taft',
    death_id: 1,
    notes: 'He was the greatest guitar player that ever lived'
  },
  {
    name: 'Tim Fischer',
    death_id: 2,
    notes: 'He was the greatest poet that ever lived'
  },
  {
    name: 'Kurt Kurtains',
    death_id: 3,
    notes: 'She made the greatest curtains that ever lived'
  }
];

module.exports = [users, deaths, dates];
