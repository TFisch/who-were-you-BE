const chai = require('chai');

const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);

describe('API Routes', () => {
  describe('GET /api/v1/deaths', () => {
    it('should return all of the dead people', done => {
      chai.request(server)
        .get('/api/v1/deaths')
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.json;
          done();
        });
    });
  });

})


