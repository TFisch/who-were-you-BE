const express = require('express');

const app = express();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.set('port', process.env.PORT || 3000);

app.use(express.static('public'));

app.get('/api/v1/deaths', (request, response) => {
  database('deaths')
    .select()
    .then(deaths => {
      response.status(200).json(deaths);
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/users/:id', (request, response) => {
  database('users').where('id', request.params.id).select()
    .then(users => {
      if (users.length) {
        response.status(200).json(users);
      } else {
        response.status(404).json({
          error: `Could not find project with id ${request.params.id}`
        })
      }
    })
    .catch(error => {
      response.status(500).json({ error })
    })
})

app.get('/api/v1/deaths/:id', (request, response) => {
  database('deaths').where('id', request.params.id).select()
    .then(deaths => {
      if (deaths.length) {
        response.status(200).json(deaths);
      } else {
        response.status(404).json({
          error: `Could not find project with id ${request.params.id}`
        })
      }
    })
    .catch(error => {
      response.status(500).json({ error })
    })
})

app.get('/api/v1/dates', (request, response) => {
  database('dates')
    .select()
    .then(dates => {
      response.status(200).json(dates);
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.post('/api/v1/users', (request, response) => {
  const userData = request.body;
  for (const requiredParameter of ['name']['birth_day']['year']) {
    if (!deathData[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `You're missing a "${requiredParameter}" property.` });
    }
  }
  database('users')
    .insert(userData, 'id')
    .then(user => {
      response.status(201).json({ id: user[0] });
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.delete('/api/v1/users/:id/comment', (request, response) => {
  database('users').where({ id: request.params.id }).select('comment')

    .then(response => {

    })
})

app.delete('/api/v1/users/:id', (request, response) => {
  database('users').where({ id: request.params.id }).del()
    .then(response => {
      response.status(201).json({ id })
    })
    .catch(error => {
      response.status(500).json({ error })
    })
})

const server = app.listen(app.get('port'), () => {
  console.log(`Who Are You is running on port ${app.get('port')}`);
});

module.exports = server;
