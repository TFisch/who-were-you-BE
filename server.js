const express = require('express');
const cors = require('cors');
const app = express();
//edit
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.set('port', process.env.PORT || 3010);
app.use(cors());

app.use(express.static('public'));

app.get('/api/v1/deaths', (req, res) => {
  if (req.query.deletable) {
    let death_deletable = req.query.deletable.toLowerCase();
    database('deaths')
      .where({ deletable: death_deletable })
      .select()
      .then(deaths => {
        res.status(200).json(deaths);
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  } else {
    database('deaths')
      .select()
      .then(deaths => {
        res.status(200).json(deaths);
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }
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

// Maybe delete this one
app.get('/api/v1/deaths/:id', (request, response) => {
  database('deaths')
    .where('id', request.params.id)
    .select()
    .then(deaths => {
      if (deaths.length) {
        response.status(200).json(deaths);
      } else {
        response.status(404).json({
          error: `Could not find any dead people that match the criteria of id: ${
            request.params.id
            }`
        });
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/deaths/:date_id/:year', (request, response) => {
  database('deaths')
    .where('date_id', request.params.date_id)
    .where('year', request.params.year)
    .select()
    .then(deaths => {
      if (deaths.length) {
        response.status(200).json(deaths);
      } else {
        response.status(404).json({
          error: `Sorry no souls wanted to be associated with your body :(`
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

app.get('/api/v1/dates/:id/id', (request, response) => {
  database('dates')
    .where('id', request.params.id)
    .select()
    .then(date => {
      response.status(200).json(date);
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/dates/:day', (request, response) => {
  const spacedDay = request.params.day.replace(/_/, ' ');
  database('dates')
    .where('day', spacedDay)
    .select()
    .then(day => {
      if (day.length) {
        response.status(200).json(day[0].id);
      } else {
        response.status(404).json({
          error: `Could not find anyone who died on ${request.params.id}`
        });
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.post('/api/v1/users', (request, response) => {
  let userData = request.body;
  for (let requiredParameter of ['name', 'death_id', 'notes', 'date_id']) {
    if (!userData[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `You're missing a "${requiredParameter}" property.` });
    }
  }
  database('users')
    .insert(userData, 'id')
    .then(userId => {
      response.status(201).json({ userId });
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.post('/api/v1/deaths', (request, response) => {
  let deathData = request.body;
  for (let requiredParameter of [
    'person_name',
    'date_id',
    'year',
    'deletable'
  ]) {
    if (!deathData[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `You're missing a "${requiredParameter}" property.` });
    }
  }
  database('deaths')
    .insert(deathData, 'id')
    .then(deadPersonId => {
      response.status(201).json({ deadPersonId });
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
      response.status(200).send('deleted');
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.delete('/api/v1/deaths/:id', (request, response) => {
  database('deaths')
    .where({ id: request.params.id })
    .where({ deletable: true })
    .del()
    .then(response => {
      response.status(200).send('deleted!');
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.patch('/api/v1/users/:id', (request, response) => {
  let user = request.body;
  database('users')
    .where({ id: request.params.id })
    .update(user)
    .then(response => {
      response.status(200).send('Updated!');
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.put('/api/v1/deaths/:id', (request, response) => {
  console.log(request.body);
  let death = request.body;
  database('deaths')
    .where({ id: request.params.id })
    .where({ deletable: true })
    .update(death)
    .then(response => {
      response.status(200).send('Updated!');
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

const server = app.listen(app.get('port'), () => {
  console.log(`Who Are You running on port ${app.get('port')}`);
});

module.exports = { server, database };
