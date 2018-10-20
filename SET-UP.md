# Who Were You

### Dependencies
These set up instructions assume that you already have the following installed:
- Knex.JS
- Node.JS
- Express.JS
- PostgreSQL

Fork this repository and run `NPM INSTALL` to install NPM dependencies.

#### Set Up

##### Ensure PostgreSQL is running and run:
* $ CREATE DATABASE who_are_you;

##### Start the Express server:
* $ nodemon server

##### Setup DB schema and seed DB for development:
* $ knex migrate:latest --env development

* $ knex seed:run --env development

##### Setup DB schema and seed DB for test:
* $ knex migrate:latest --env test

* $ knex seed:run --env test


#### Running Tests

Run `npm t`

## Contributing
Who Were you is a fun project that we are hoping to grow and learn from, and your contributions can help with that. We do ask that you review the [Contribution
Guidelines](./contributing.md) before submitting a pull request.

## License
MIT
