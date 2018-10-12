const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const { server, database } = require('../server');

chai.use(chaiHttp);

describe('API Routes', () => {
  beforeEach(() => {
    database.migrate.rollback();
    database.migrate.latest().then(() => database.seed.run());
  });
  describe('GET /api/v1/deaths', () => {
    it('should return all of the dead people', done => {
      chai
        .request(server)
        .get('/api/v1/deaths')
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body[0].should.have.property('person_name');
          response.body[0].should.have.property('day_id');
          response.body[0].should.have.property('year');
          done();
        });
    });
  });

  describe('GET /api/v1/dates', () => {
    it('should return all of the dates', done => {
      chai
        .request(server)
        .get('/api/v1/dates')
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body[0].should.have.property('day');
          response.body[0].should.have.property('astrology_sign');
          done();
        });
    });
  });
});
