const express = require('express');
const app = express();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);

app.use(express.static('public'));

app.get('/api/v1/deaths', (request, response) => {
  database('deaths').select()
    .then((deaths) => {
      response.status(200).json(deaths);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/dates', (request, response) => {
  database('dates').select()
    .then((dates) => {
      response.status(200).json(dates);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.listen(app.get('port'), () => {
  console.log(`Who Are You is running on port ${app.get('port')}`);
});
