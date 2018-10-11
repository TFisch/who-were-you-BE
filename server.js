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

app.post('/api/v1/deaths', (request, response) => {
  const deathData = request.body;
  for (const requiredParameter of ['person_name']['day']['year']) {
    if (!deathData[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `You're missing a "${requiredParameter}" property.` });
    }
  }

  database('deaths')
    .insert(deathData, 'id')
    .then(death => {
      response.status(201).json({ id: death[0] });
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

app.post('/api/v1/dates', (request, response) => {
  const dateData = request.body;
  for (const requiredParameter of ['day']['astrology_sign']) {
    if (!dateData[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `You're missing a "${requiredParameter}" property.` });
    }
  }

  database('deaths')
    .insert(dateData, 'id')
    .then(date => {
      response.status(201).json({ id: date[0] });
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

const server = app.listen(app.get('port'), () => {
  console.log(`Who Are You is running on port ${app.get('port')}`);
});

module.exports = server;
