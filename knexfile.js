module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/who_are_you',
    useNullAsDefault: true,
    migrations: {
      directory: './db/migrations'
    },
  }
};
