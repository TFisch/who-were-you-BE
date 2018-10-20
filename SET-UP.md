## Getting Started

This is a general guide to setting up the Who-were-you BackEnd on your local machine.

### Dependencies

* Node.js ^10.0.0
* PostgreSQL database
* Knex.js
* Express.js
* [Nodemon](https://nodemon.io/) installed globally


### Get it 

If you're planning on contributing code to the project it is a good idea to begin by forking this repo using the `Fork` button in the top-right corner of this screen. You should then be able to use `git clone` to copy your fork onto your local machine.

    git clone https://github.com/TFisch/who-were-you-BE.git

Go into your new local copy of the Builidng Buddies API:

    cd who-were-you-BE

And then add an `upstream` remote that points to the main repo:

    git remote add -u https://github.com/TFisch/who-were-you-BE.git

Run the following command:

    npm install

### Get it running 

First, you need to create the developent and tests databases the app will use by manually typing the following in your terminal:

```sh
$ psql 
$ CREATE DATABASE who-are-you;
$ CREATE DATABASE who_are_you_tests;
```

In a separate terminal window from your database setup, run the migrations and seed for each database:

```sh
$ knex migrate:latest --env development
$ knex seed:run --env development
$ knex migrate:latest --env test
$ knex seed:run --env test
```

To start the server in development mode run: 
```sh
$ nodemon server
```

Your server should now be running on http://localhost:3010 

### Testing 

To run the test suite enter:

    $ npm test
    
