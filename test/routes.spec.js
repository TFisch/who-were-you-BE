const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const { server, database } = require('../server');

chai.use(chaiHttp);

describe('API Routes', () => {
  beforeEach(done => {
    database.migrate.rollback().then(() => {
      database.migrate.latest().then(() => {
        return database.seed.run().then(() => {
          done();
        });
      });
    });
  });
  describe('GET /api/v1/deaths', () => {
    it('should return all of the dead people', done => {
      chai
        .request(server)
        .get('/api/v1/deaths')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body[0].should.have.property('person_name');
          res.body[0].should.have.property('date_id');
          res.body[0].should.have.property('year');
          done();
        });
    });
  });

  describe('GET /api/v1/dates', () => {
    it('should return all of the dates', done => {
      chai
        .request(server)
        .get('/api/v1/dates')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body[0].should.have.property('day');
          res.body[0].should.have.property('astrology_sign');
          done();
        });
    });
  });

  describe('GET /api/v1/users/:id', () => {
    it('should return a specfic user', done => {
      chai
        .request(server)
        .get('/api/v1/users/1')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body[0].should.have.property('death_id');
          res.body[0].should.have.property('notes');
          res.body[0].should.have.property('date_id');
          done();
        });
    });
  });

  describe('GET /api/v1/deaths/:id', () => {
    it('should return a specfic death', done => {
      chai
        .request(server)
        .get('/api/v1/deaths/1')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body[0].should.have.property('person_name');
          res.body[0].should.have.property('date_id');
          res.body[0].should.have.property('year');
          done();
        });
    });
  });

  describe('GET /api/v1/dates', () => {
    it('should return all dates', done => {
      chai
        .request(server)
        .get('/api/v1/dates')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body[0].should.have.property('day');
          res.body[0].should.have.property('astrology_sign');
          done();
        });
    });
  });

  describe('GET /api/v1/users', () => {
    it('should return all users', done => {
      chai
        .request(server)
        .get('/api/v1/users')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body[0].should.have.property('name');
          res.body[0].should.have.property('death_id');
          res.body[0].should.have.property('notes');
          res.body[0].should.have.property('date_id');
          done();
        });
    });
  });

  describe('POST /api/v1/users', () => {
    it('Should have a HAPPY PATH', done => {
      chai
        .request(server)
        .post('/api/v1/users')
        .send({
          name: 'Bools',
          death_id: 3,
          notes: 'I can not believe this girl makes curtains',
          date_id: 1
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.have.property('userId');
          done();
        });
    });
  });

  describe('POST /api/v1/deaths', () => {
    it('Should have a HAPPY PATH', done => {
      chai
        .request(server)
        .post('/api/v1/deaths')
        .send({
          id: 4,
          person_name: 'Kurtain Cobain',
          date_id: 2,
          year: 1994,
          deletable: true
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.have.property('deadPersonId');
          done();
        });
    });
  });

  describe('DELETE /api/v1/deaths/:id', () => {
    it.skip('should delete a specfic death', done => {
      chai
        .request(server)
        .delete('/api/v1/deaths/3')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          // res.body[0].should.be.a('object');
          done();
        });
    });
  });

  describe('DELETE /api/v1/users/:id', () => {
    it.skip('should delete a specfic user', done => {
      chai
        .request(server)
        .delete('/api/v1/users/2')
        .end((err, res) => {
          console.log(res);
          res.should.have.status(200);
          res.should.be.json;
          res.body[0].should.be.a('object');
          done();
        });
    });
  });

  describe('PUT /api/v1/users/:id', () => {
    it.skip('should update a specfic user', done => {
      chai
        .request(server)
        .put('/api/v1/users/2')
        .send({
          name: 'Bools',
          death_id: 3,
          notes: 'I can finally believe this girl makes curtains',
          date_id: 1
        })
        .end((err, res) => {
          console.log(res);
          res.should.have.status(200);
          res.should.be.json;
          res.body[0].should.be.a('object');
          done();
        });
    });
  describe('PUT /api/v1/deaths/:id', () => {
    it.skip('should update a specfic death', done => {
      chai
        .request(server)
        .put('/api/v1/deaths/2')
        .send({
          person_name: 'Bools',
          year: 3,
          deletable: 'true',
          date_id: 1
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body[0].should.be.a('object');
          done();
        });
    });
  });

  describe('PUT /api/v1/deaths/:id', () => {
    it.skip('should update a specfic death', done => {
      chai
        .request(server)
        .put('/api/v1/deaths/2')
        .send({
          person_name: 'Kurtain Cobain',
          date_id: 2,
          year: 2000,
          deletable: true
        })
        .end((err, res) => {
          console.log(res);
          res.should.have.status(200);
          res.should.be.json;
          res.body[0].should.be.a('object');
          done();
        });
    });
  });
});
