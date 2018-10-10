module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/who_are_you',
    migrations: {
      directory: './db/migrations',
    },
    useNullAsDefault: true,
  },
  test: {
    client: 'pg',
    connection: 'postgres://localhost/who_are_you_tests',
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds/test',
    },
    useNullAsDefault: true,
  },
};
