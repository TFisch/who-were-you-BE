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

app.get('/api/v1/users', (request, response) => {
  database('users')
    .select()
    .then(users => {
      response.status(200).json(users);
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/users/:id', (request, response) => {
  database('users')
    .where('id', request.params.id)
    .select()
    .then(users => {
      if (users.length) {
        response.status(200).json(users);
      } else {
        response.status(404).json({
          error: `Could not find project with id ${request.params.id}`
        });
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/deaths/:id', (request, response) => {
  database('deaths')
    .where('id', request.params.id)
    .select()
    .then(deaths => {
      if (deaths.length) {
        response.status(200).json(deaths);
      } else {
        response.status(404).json({
          error: `Could not find project with id ${request.params.id}`
        });
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

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
  let userData = request.body;
  console.log(userData);
  for (let requiredParameter of ['name']['death_id']['notes']) {
    if (!userData[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `You're missing a "${requiredParameter}" property.` });
    }
  }
  database('users')
    .insert(userData, 'id')
    .then(user => {
      response.status(201).json({ user });
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.post('/api/v1/deaths', (request, response) => {
  let deathData = request.body;
  for (let requiredParameter of ['person_name']['day_id']['year']) {
    if (!deathData[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `You're missing a "${requiredParameter}" property.` });
    }
  }
  database('deaths')
    .insert(deathData, 'id')
    .then(deadPerson => {
      response.status(201).json({ deadPerson });
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.delete('/api/v1/users/:id', (request, response) => {
  database('users')
    .where({ id: request.params.id })
    .del()
    .then(response => {
      response.status(201).json({ id });
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.delete('/api/v1/deaths/:id', (request, response) => {
  database('deaths')
    .where({ id: request.params.id })
    .del()
    .then(response => {
      response.status(201).json({ id });
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

const server = app.listen(app.get('port'), () => {
  console.log(`Who Are You running on port ${app.get('port')}`);
});

module.exports = { server, database };
